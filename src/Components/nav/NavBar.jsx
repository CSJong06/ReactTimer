import React, { useContext } from "react";

//Import SettingsContect to use the Settings functions
import { SettingsContext } from "../context/SettingsContext"; 

import { Link } from "react-router-dom";
import './NarBar.css';

export default function Navbar() {
  //grab the functions from the context
  const { settings, updateSetting, toggleTheme } = useContext(SettingsContext);
  const theme = settings.theme; // grab the theme from settings

  //plug in the theme stlye to the navbar (from settings)
  return (
    <nav className={theme}> 
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/analytics" className="nav-link">Analytics</Link>
    </nav>
  );
}
