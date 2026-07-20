import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

export default function AnimatedCounter({
    end,
    duration = 2,
    suffix = "",
    prefix = "",
    decimals = 0,
    label,
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const durationMs = duration * 1000;

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = easeOutCubic(progress);
            setCount(eased * end);

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setCount(end);
            }
        }

        requestAnimationFrame(tick);
    }, [isInView, end, duration]);

    const formatted =
        decimals > 0
            ? count.toFixed(decimals)
            : Math.round(count).toLocaleString();

    return (
        <div ref={ref} className="text-center">
            <p className="text-4xl font-heading font-bold text-cyan">
                {prefix}
                {formatted}
                {suffix}
            </p>
            {label && (
                <p className="mt-2 text-sm text-text-secondary font-body">
                    {label}
                </p>
            )}
        </div>
    );
}
