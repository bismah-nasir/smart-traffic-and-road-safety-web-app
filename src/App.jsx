import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <LoadingScreen isLoading={isLoading} />

            {!isLoading && (
                <>
                    <Navbar />

                    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                        <h1>Smart Traffic and Road Safety Web App</h1>
                    </section>

                    <Footer />
                </>
            )}
        </>
    );
}
