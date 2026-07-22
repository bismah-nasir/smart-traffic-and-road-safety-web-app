import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import BackToTop from "@/components/BackToTop";
import FloatingActionButton from "@/components/FloatingActionButton";
import EmergencyPopup from "@/components/EmergencyPopup";
import NotificationToast from "@/components/NotificationToast";
import ScrollToTop from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import LiveTraffic from "@/pages/LiveTraffic";
import RoadSafety from "@/pages/RoadSafety";
import Emergency from "@/pages/Emergency";

export default function App() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);
    const [notification, setNotification] = useState({
        isVisible: false,
        message: "",
        type: "info",
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const notifTimer = setTimeout(() => {
                setNotification({
                    isVisible: true,
                    message:
                        "Smart Signal System activated at 50 major intersections.",
                    type: "info",
                });
            }, 4000);
            return () => clearTimeout(notifTimer);
        }
    }, [isLoading]);

    return (
        <>
            <ScrollToTop />
            <LoadingScreen isLoading={isLoading} />

            {!isLoading && (
                <>
                    <Navbar />

                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/live-traffic" element={<LiveTraffic />} />
                            <Route path="/road-safety" element={<RoadSafety />} />
                            <Route path="/emergency" element={<Emergency />} />
                        </Routes>
                    </AnimatePresence>

                    <Footer />
                    <BackToTop />
                    <FloatingActionButton
                        onEmergencyClick={() => setShowEmergencyPopup(true)}
                    />
                    <EmergencyPopup
                        isOpen={showEmergencyPopup}
                        onClose={() => setShowEmergencyPopup(false)}
                    />
                    <NotificationToast
                        message={notification.message}
                        type={notification.type}
                        isVisible={notification.isVisible}
                        onClose={() =>
                            setNotification((prev) => ({
                                ...prev,
                                isVisible: false,
                            }))
                        }
                    />
                </>
            )}
        </>
    );
}
