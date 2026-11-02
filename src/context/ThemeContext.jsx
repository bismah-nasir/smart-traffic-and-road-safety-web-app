import { useState, useEffect } from "react";
import { ThemeContext } from "@/context/useTheme";

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("smarttraffic-theme");
        return saved ? saved === "dark" : true; // default dark
    });

    useEffect(() => {
        localStorage.setItem("smarttraffic-theme", isDark ? "dark" : "light");
        document.body.classList.toggle("light", !isDark);
    }, [isDark]);

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
