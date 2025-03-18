import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSpeak } from "../context/AudioContext";

const RouteChangeAudio = () => {
  const location = useLocation(); // ✅ Detects route changes
  const { speak } = useSpeak(); // ✅ Get the speak function

  useEffect(() => {
    if (location.pathname === "/settings") {
      const randomValue = Math.random() < 0.5 ? "ViewSettings1" : "ViewSettings2";
      speak(randomValue);
    }
  }, [location.pathname]); // ✅ Runs only when the path changes

  return null; // ✅ This component doesn’t render anything, it just runs the effect
};

export default RouteChangeAudio;
