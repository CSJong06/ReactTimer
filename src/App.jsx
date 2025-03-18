import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeakProvider } from "./Components/context/AudioContext";
import { NotificationProvider } from "./Components/context/NotificationContext";
import { SettingsProvider } from "./Components/context/SettingsContext";
import NavBar from "./Components/nav/NavBar";
import Home from "./Components/Pages/Home";
import Settings from "./Components/Pages/Settings";
import ToastManager from "./Components/Notifications/ToastManager";
import RouteChangeAudio from "./Components/Pages/RouteChangeAudio";
import Bot from "./Components/Companion/Bot";
import "./App.css";

function App() {
  return (
    <NotificationProvider>
      <SpeakProvider>
        <Bot />
        <Router>
          <SettingsProvider>
            <NavBar />
            <RouteChangeAudio /> {/* ✅ Plays audio when switching routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </SettingsProvider>
        </Router>
      </SpeakProvider>
    </NotificationProvider>
  );
}

export default App;
