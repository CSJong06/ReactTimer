import React from 'react';
import { NotificationProvider } from './Components/context/NotificationContext';
import { SettingsProvider } from './Components/context/SettingsContext'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToastManager from './Components/Notifications/ToastManager';
import Settings from './Components/Pages/Settings';
import NavBar from './Components/nav/NavBar';
import Home from './Components/Pages/Home';
import './App.css';

function App() {
  return (
    <NotificationProvider> 
      <Router>
        <SettingsProvider>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </SettingsProvider>
      </Router>
    </NotificationProvider>
  );
}

export default App;
