import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

import Home from "@/pages/Home";
import RoadSafety from '@/pages/RoadSafety';
import Emergency from '@/pages/Emergency';

export default function App() {
    const location = useLocation();
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

                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/road-safety" element={<RoadSafety />} />
                            <Route path="/emergency" element={<Emergency />} />
                        </Routes>
                    </AnimatePresence>

                    <Footer />
                </>
            )}
        </>
    );
}
