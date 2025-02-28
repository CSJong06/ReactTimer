import { createContext, useState, useEffect } from "react";

//context for theme settings
export const ThemeContext = createContext(); 

//context for settings
export const SettingsContext = createContext(); 


const defaultSettings = {
    theme: 'dark', // Default theme
    toggleTheme: () => {}, // Placeholder for toggle function

    notifications: true,
    sound: false //currently doesn't do anything
}

export const SettingsProvider = ({ children }) => {
    // use default settings, or load from local storage
    const [settings, setSettings] = useState(()=>{
        return JSON.parse(localStorage.getItem("appSettings")) || defaultSettings
    }); 

    useEffect(() => {
        // save settings to local storage whenever settings change
        localStorage.setItem("appSettings", JSON.stringify(settings));
        document.body.className = settings.theme === 'dark' ? 'dark-theme' : 'light-theme';
    }, [settings]);

    
    function updateSetting(key, value) {
        // update the setting in the state
        setSettings((prev) => ({
          ...prev,
          [key]: value,
        }));
    }

    const toggleTheme = () => {
        // update the settings with the new theme
        updateSetting('theme', settings.theme === 'dark' ? 'light' : 'dark');
    };

    return ( 

        <SettingsContext.Provider value={{ settings, updateSetting, toggleTheme }}>
          {children}
        </SettingsContext.Provider>
    );
}
