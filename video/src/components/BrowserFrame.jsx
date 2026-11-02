import { colors, bodyFont } from "../theme";

export const BAR_HEIGHT = 48;

// Dark browser window chrome around the app recordings.
export const BrowserFrame = ({ width, height, url, children, style }) => (
    <div
        style={{
            width,
            height,
            borderRadius: 20,
            overflow: "hidden",
            background: colors.navy950,
            border: "1.5px solid rgba(34,211,238,0.22)",
            boxShadow: "0 40px 110px rgba(0,0,0,0.6), 0 0 80px rgba(6,182,212,0.12)",
            display: "flex",
            flexDirection: "column",
            ...style,
        }}
    >
        <div
            style={{
                height: BAR_HEIGHT,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "0 20px",
                background: "#0a1322",
                borderBottom: `1px solid ${colors.border}`,
            }}
        >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
            ))}
            <div
                style={{
                    marginLeft: 16,
                    width: 640,
                    height: 30,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "0 14px",
                    fontFamily: bodyFont,
                    fontSize: 16,
                    color: colors.textSecondary,
                }}
            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth="2.4" strokeLinecap="round">
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                {url}
            </div>
        </div>
        <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
);
