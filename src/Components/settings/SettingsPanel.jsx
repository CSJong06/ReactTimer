import { useContext } from "react";  
// Importing audio files
const toggleClickSound = new Audio('/audioFiles/ToggleClick.mp3');
const toggleHoverSound = new Audio('/audioFiles/ToggleHover.mp3');

import { SettingsContext } from "../context/SettingsContext";
import { useSpeak } from "../context/AudioContext";

export default function SettingsPanel(){
  const { settings, updateSetting } = useContext(SettingsContext);

  const handleThemeChange = (e) => {
    // Update it in settings
    updateSetting("theme", e.target.value);
    // Change the display
    document.body.className = e.target.value === "dark" ? "dark-theme" : "light-theme";
  };

  const playToggleClickSound = () => {
    toggleClickSound.play();
  }

  const playToggleHoverSound = () => {
    toggleHoverSound.play();
  }

  return (
    <div className='Card'>
      <div className="settings-panel">

        <h2>Settings</h2>

        <label>
          Theme:
          <select value={settings.theme} onChange={handleThemeChange}>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </label>

        <label>
          Notifications:
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => updateSetting("notifications", !settings.notifications)}
          />
        </label>

        <label>
          App Sounds:
          <input
            type="checkbox"
            checked={settings.sound}
            onChange={() => updateSetting("sound", !settings.sound)}
          />
        </label>

        <label>
          Companion:
          <input
            type="checkbox"
            checked={true}
            onChange={(e) => {
              e.preventDefault(); // Prevent default checkbox behavior
              playToggleClickSound(); // Play toggle click sound
            }}
            onMouseEnter={playToggleHoverSound} // Play hover sound
          />
        </label>

      </div>
    </div>
  );
}
