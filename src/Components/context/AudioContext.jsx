import React, { createContext, useContext, useState } from "react";
import TitleSelection from "../analytics/TitleSelction";

// Create the context
const SpeakContext = createContext();

// Provider Component
export const SpeakProvider = ({ children }) => {
  const [audio, setAudio] = useState(null);

  // Sound Library
  const sounds = {
    DarkMode: "/audioFiles/DarkMode.mp3",
    Greeting1: "/audioFiles/Greeting1.mp3",
    Greeting2: "/audioFiles/Greeting2.mp3",
    Greeting3: "/audioFiles/Greeting3.mp3",
    LightMode: "/audioFiles/LightMode.mp3",
    ProfileOpen1: "/audioFiles/ProfileOpen1.mp3",
    ProfileOpen2: "/audioFiles/ProfileOpen2.mp3",
    Reset1: "/audioFiles/Reset1.mp3",
    Reset2: "/audioFiles/Reset2.mp3",
    TimerComplete1: "/audioFiles/TimerComplete1.mp3",
    TimerComplete2: "/audioFiles/TimerComplete2.mp3",
    TimerStart1: "/audioFiles/TimerStart1.mp3",
    TimerStart2: "/audioFiles/TimerStart2.mp3",
    TitleSelection1: "/audioFiles/TitleSelection1.mp3",
    TitleSelection2: "/audioFiles/TitleSelection2.mp3",
    TitleUnlock1: "/audioFiles/TitleUnlock1.mp3",
    TitleUnlock2: "/audioFiles/TitleUnlock2.mp3",
    ToggleClick: "/audioFiles/ToggleClick.mp3",
    ToggleHover: "/audioFiles/ToggleHover.mp3",
    ViewSettings1: "/audioFiles/ViewSettings1.mp3",
    ViewSettings2: "/audioFiles/ViewSettings2.mp3",
  };

  // Function to play a sound
  const speak = (soundKey) => {
    const audioFile = sounds[soundKey]; // Get file path from the sounds object
    if (!audioFile) return; // Prevent errors if sound doesn't exist

    if (audio) {
      audio.pause(); // Stop any currently playing audio
      audio.currentTime = 0; // Reset playback position
    }

    const newAudio = new Audio(audioFile);
    setAudio(newAudio);
    newAudio.play().catch(error => console.error("Error playing sound:", error));

    return newAudio; // ✅ Return the audio instance
  };

  return (
    <SpeakContext.Provider value={{ speak }}>
      {children}
    </SpeakContext.Provider>
  );
};

// Hook to use the context
export const useSpeak = () => {
  return useContext(SpeakContext);
};
