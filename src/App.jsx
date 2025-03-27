import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeakProvider } from "./Components/context/AudioContext";
import { NotificationProvider } from "./Components/context/NotificationContext";
import { SettingsProvider } from "./Components/context/SettingsContext";
import NavBar from "./Components/nav/NavBar";
import Home from "./Components/Pages/Home";
import Analytics from "./Components/Pages/Analytics";
import { AnalyticsCardProvider } from "./Components/context/AnalyticsCardContext";
import { TimerDataProvider } from "./Components/context/TimerDataContext";

import ToastManager from "./Components/Notifications/ToastManager";

import Bot from "./Components/Companion/Bot";
import "./App.css";

function App() {
  return (
    <NotificationProvider>
      <SpeakProvider>
        <Bot />
        <TimerDataProvider>
        <Router>
          <SettingsProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={
                <AnalyticsCardProvider>
                  <Analytics />
                </AnalyticsCardProvider>
              } />
            </Routes>
          </SettingsProvider>
        </Router>
        </TimerDataProvider>
      </SpeakProvider>
    </NotificationProvider>
  );
}

export default App;
