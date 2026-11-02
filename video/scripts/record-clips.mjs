// Records the app for the demo video and takes the poster screenshots.
//
// 1. In the repo root: npm run build && npx vite preview --port 4317
// 2. In video/:        npm run record                 (everything)
//                      npm run record -- route poster (only some clips)
//
// Each clip is captured as full-quality JPEG frames (Chrome DevTools screencast, so it stays sharp),
// then encoded to public/clips/<name>.mp4 at 30 fps. Poster screenshots go to public/poster/ at 2x.
// Set CHROME_PATH if Chrome is installed somewhere else, or APP_URL to record another address.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

const APP_URL = process.env.APP_URL ?? "http://localhost:4317";
const CHROME_PATH = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ONLY = process.argv.slice(2);
const CLIPS_DIR = path.resolve("public/clips");
const POSTER_DIR = path.resolve("public/poster");
const wanted = (name) => !ONLY.length || ONLY.includes(name);

const browser = await chromium.launch({ executablePath: CHROME_PATH, args: ["--hide-scrollbars"] });
const context = await browser.newContext({ viewport: { width: 1600, height: 900 } });

// Start in dark mode, and show a visible mouse pointer that follows Playwright's mouse, with a ripple on click.
await context.addInitScript(() => {
    localStorage.setItem("smarttraffic-theme", "dark");
    window.addEventListener("DOMContentLoaded", () => {
        const cursor = document.createElement("div");
        cursor.innerHTML =
            '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#0f172a" stroke-width="1.5" stroke-linejoin="round"/></svg>';
        Object.assign(cursor.style, {
            position: "fixed",
            left: "-100px",
            top: "-100px",
            zIndex: 2147483647,
            pointerEvents: "none",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,.5))",
        });
        document.body.appendChild(cursor);
        addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX - 3 + "px";
            cursor.style.top = e.clientY - 2 + "px";
        }, true);
        addEventListener("mousedown", (e) => {
            const ripple = document.createElement("div");
            Object.assign(ripple.style, {
                position: "fixed",
                left: e.clientX - 18 + "px",
                top: e.clientY - 18 + "px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "3px solid #22d3ee",
                zIndex: 2147483646,
                pointerEvents: "none",
                transition: "transform .45s ease-out, opacity .45s ease-out",
            });
            document.body.appendChild(ripple);
            requestAnimationFrame(() => {
                ripple.style.transform = "scale(1.8)";
                ripple.style.opacity = "0";
            });
            setTimeout(() => ripple.remove(), 600);
        }, true);
    });
});

const page = await context.newPage();
const cdp = await context.newCDPSession(page);
let frames = [];
cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
    frames.push({ data, t: metadata.timestamp });
    await cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
});

const wait = (ms) => page.waitForTimeout(ms);

// The site is loaded once, like a real visit: its loading screen and the "Smart Signal System" notice
// only appear on the first load (the notice lands in the Home clip). Later pages are opened with the
// app's own client-side navigation, so they don't reload.
let loaded = false;
async function open(route) {
    if (!loaded) {
        await page.goto(APP_URL + route);
        await wait(3500); // loading screen and entry animations
        loaded = true;
    } else {
        await page.evaluate((route) => {
            history.pushState({}, "", route);
            dispatchEvent(new PopStateEvent("popstate"));
        }, route);
        await wait(2500); // entry animations
    }
    await page.mouse.move(1400, 700);
}

// Smooth scroll by `dy` pixels over `ms` milliseconds.
async function scrollBy(dy, ms = 1600) {
    await page.evaluate(([dy, ms]) => new Promise((done) => {
        const y0 = scrollY;
        const t0 = performance.now();
        const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
        (function step(now) {
            const t = Math.min((now - t0) / ms, 1);
            scrollTo(0, y0 + dy * ease(t));
            if (t < 1) requestAnimationFrame(step);
            else done();
        })(t0);
    }), [dy, ms]);
}

// Glide the pointer to an element and click where it is on screen (no scrolling into view).
async function clickOn(locator) {
    const box = await locator.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 30 });
    await wait(250);
    await page.mouse.down();
    await wait(80);
    await page.mouse.up();
}

async function record(name, actions) {
    if (!wanted(name)) return;
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), `smarttraffic-${name}-`));
    frames = [];
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 95, everyNthFrame: 1 });
    const start = Date.now();
    await actions();
    await cdp.send("Page.stopScreencast");
    const length = (Date.now() - start) / 1000;

    // Frames arrive at an uneven rate, so list each one with how long it was on screen.
    let list = "ffconcat version 1.0\n";
    frames.forEach((frame, i) => {
        const file = `f${String(i).padStart(5, "0")}.jpg`;
        fs.writeFileSync(path.join(dir, file), Buffer.from(frame.data, "base64"));
        const next = i + 1 < frames.length ? frames[i + 1].t : frames[0].t + length;
        list += `file ${file}\nduration ${Math.max(next - frame.t, 0.001).toFixed(4)}\n`;
    });
    list += `file f${String(frames.length - 1).padStart(5, "0")}.jpg\n`;
    fs.writeFileSync(path.join(dir, "list.ffconcat"), list);

    fs.mkdirSync(CLIPS_DIR, { recursive: true });
    const out = path.join(CLIPS_DIR, `${name}.mp4`);
    execFileSync(
        "npx",
        ["remotion", "ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", path.join(dir, "list.ffconcat"),
            "-r", "30", "-fps_mode", "cfr", "-pix_fmt", "yuv420p", "-c:v", "libx264", "-preset", "slow", "-crf", "14", out],
        { stdio: "inherit", shell: process.platform === "win32" },
    );
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`${out} (${frames.length} frames, ${length.toFixed(1)}s)`);
}

await open("/");
await record("home", async () => {
    await wait(2200);
    await scrollBy(900, 2200);
    await wait(1800);
    await scrollBy(900, 2200);
    await wait(1800);
});

await open("/live-traffic");
await record("live-traffic", async () => {
    await wait(1200);
    await scrollBy(430, 1800);
    await wait(7000);
});

await open("/live-traffic");
await page.evaluate(() => scrollTo(0, 430));
await wait(800);
await record("theme", async () => {
    await wait(1200);
    await clickOn(page.getByRole("button", { name: /Switch to light mode/i }));
    await wait(4000);
});
// Back to dark mode for the rest (the page isn't reloaded between clips).
if ((await page.getByRole("button", { name: /Switch to dark mode/i }).count()) > 0) {
    await page.getByRole("button", { name: /Switch to dark mode/i }).click();
    await wait(600);
}

await open("/route-suggestion");
await record("route", async () => {
    await wait(600);
    const start = page.getByLabel("Start Location");
    await clickOn(start);
    await start.pressSequentially("Clifton", { delay: 90 });
    await wait(300);
    const destination = page.getByLabel("Destination");
    await clickOn(destination);
    await destination.pressSequentially("Karachi Airport (JIAP)", { delay: 60 });
    await wait(400);
    await clickOn(page.getByRole("button", { name: /Find Optimal Route/i }));
    await wait(2300);
    await scrollBy(560, 1600);
    await wait(1200);
    await clickOn(page.getByRole("button", { name: /^Select Route/i }).first());
    await wait(2600);
});

await open("/road-safety");
await record("safety", async () => {
    await wait(1500);
    await scrollBy(700, 2200);
    await wait(2500);
});

await open("/emergency");
await record("emergency", async () => {
    await wait(1200);
    await clickOn(page.getByRole("button", { name: "Emergency SOS" }).filter({ hasText: "SOS" }));
    await wait(3500);
});

await context.close();

// Poster screenshots in dark mode, without the pointer or the "Smart Signal System" notice.
const hideNotice = () => {
    localStorage.setItem("smarttraffic-theme", "dark");
    new MutationObserver((changes) => {
        for (const { addedNodes } of changes) {
            for (const node of addedNodes) {
                if (node.nodeType === 1 && node.textContent.includes("Smart Signal System")) node.style.visibility = "hidden";
            }
        }
    }).observe(document, { childList: true, subtree: true });
};

if (wanted("poster")) {
    fs.mkdirSync(POSTER_DIR, { recursive: true });

    // Desktop Live Traffic at 2x: from the "Real-time Monitoring" pill down to the stat cards.
    const desktop = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2 });
    await desktop.addInitScript(hideNotice);
    const shot = await desktop.newPage();
    await shot.goto(APP_URL + "/live-traffic");
    await shot.waitForTimeout(3500);
    const stats = shot.getByText("Active Vehicles", { exact: true });
    await stats.scrollIntoViewIfNeeded(); // start the stat counters
    await shot.waitForTimeout(3000);
    await shot.evaluate(() => scrollTo(0, 0));
    await shot.waitForTimeout(500);
    const pill = await shot.getByText(/real-time monitoring/i).first().boundingBox();
    const statsBox = await stats.boundingBox();
    const top = pill.y - 28;
    await shot.screenshot({
        path: path.join(POSTER_DIR, "live-traffic.png"),
        fullPage: true,
        clip: { x: 216, y: top, width: 1168, height: statsBox.y + statsBox.height + 36 - top },
    });
    await desktop.close();

    // Road Safety on an iPhone 16 (393×852pt at 3x): the page gets the 798pt below the 54pt status bar.
    const phone = await browser.newContext({ viewport: { width: 393, height: 798 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await phone.addInitScript(hideNotice);
    const mobile = await phone.newPage();
    await mobile.goto(APP_URL + "/road-safety");
    await mobile.waitForTimeout(3500);
    // The cards fade in when scrolled into view, so pass over them once, then frame the title and first cards.
    for (let y = 0; y <= 2400; y += 300) {
        await mobile.evaluate((y) => scrollTo(0, y), y);
        await mobile.waitForTimeout(250);
    }
    await mobile.evaluate(() => scrollTo(0, 140));
    await mobile.waitForTimeout(1500);
    await mobile.screenshot({ path: path.join(POSTER_DIR, "road-safety-mobile.png") });
    await phone.close();
    console.log(`poster screenshots in ${POSTER_DIR}`);
}

await browser.close();
