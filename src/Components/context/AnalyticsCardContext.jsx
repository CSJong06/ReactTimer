import React, { createContext, useContext, useState, useEffect } from "react";
import { useNotifications } from "./NotificationContext"; 
import { useSpeak } from "./AudioContext"; 

const AnalyticsCardContext = createContext();

export const useAnalyticsCard = () => useContext(AnalyticsCardContext);

export const AnalyticsCardProvider = ({ children }) => {
    const { addNotification } = useNotifications();
    const { speak } = useSpeak();

    // Initialize state
    const [timersStarted, setTimersStarted] = useState(0);
    const [completedTimers, setCompletedTimers] = useState(0);
    const [streak, setStreak] = useState(0);
    const [streakHistory, setStreakHistory] = useState([]);
    const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem("achievements")) || {});
    const [selectedTitle, setSelectedTitle] = useState(localStorage.getItem("selectedTitle") || "No Title Selected");

    // Function to update achievements
    const updateAchievements = () => {
        const milestones = [
          { type: "completedTimers", value: 5, title: "Focused", message: 'Congratulations! You unlocked the "Focused" Title!' },
          { type: "completedTimers", value: 10, title: "Disciplined", message: 'Congratulations! You unlocked the "Disciplined" Title!' },
          { type: "completedTimers", value: 15, title: "Workaholic", message: 'Congratulations! You unlocked the "Workaholic" Title!' },
          { type: "timersStarted", value: 5, title: "Getting Started", message: 'Congratulations! You unlocked the "Getting Started" Title!' },
          { type: "timersStarted", value: 10, title: "Committed", message: 'Congratulations! You unlocked the "Committed" Title!' },
          { type: "timersStarted", value: 15, title: "Ambitious", message: 'Congratulations! You unlocked the "Ambitious" Title!' }
        ];

        const newAchievements = { ...achievements };

        milestones.forEach((milestone) => {
          const valueToCheck = milestone.type === "timersStarted" ? timersStarted : completedTimers;
        
            if(valueToCheck >= milestone.value && !newAchievements[milestone.title]) {
                newAchievements[milestone.title] = true; 
                addNotification(milestone.message, "success");

                // Play sound on unlock
                const randomValue = Math.random() < 0.5 ? "TitleUnlock1" : "TitleUnlock2";
                speak(randomValue)
            }
        });

        if (JSON.stringify(newAchievements) !== JSON.stringify(achievements)) {
          setAchievements(newAchievements);
          localStorage.setItem("achievements", JSON.stringify(newAchievements));
        }
    };

    useEffect(() => {
        updateAchievements();
    }, [timersStarted, completedTimers]);

    // Streak update logic
    const updateStreak = () => {
        const today = new Date().toISOString().split("T")[0];
        const lastActiveDate = localStorage.getItem("lastActiveDate");
        let streakCount = Number(localStorage.getItem("streakCount")) || 0;

        let streakHistory = JSON.parse(localStorage.getItem("streakHistory")) || [];

        if (lastActiveDate === today) {
          return { streakCount, streakHistory };
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        if (lastActiveDate === yesterdayString) {
          streakCount += 1;
        } else {
          streakCount = 1;
        }

        if (!streakHistory.some(entry => entry.date === today)) {
          streakHistory.push({ date: today, streak: streakCount });
          localStorage.setItem("streakHistory", JSON.stringify(streakHistory));
        }

        localStorage.setItem("lastActiveDate", today);
        localStorage.setItem("streakCount", streakCount);

        return { streakCount, streakHistory };
    };

    useEffect(() => {
        const { streakCount, streakHistory } = updateStreak();
        setStreak(streakCount);
        setStreakHistory(streakHistory);
    }, []);

    useEffect(() => {
        const updateTimers = () => {
          const storedStarted = localStorage.getItem("timersStarted");
          const storedCompleted = localStorage.getItem("completedTimers");

          if (storedStarted !== null) setTimersStarted(Number(storedStarted));
          if (storedCompleted !== null) setCompletedTimers(Number(storedCompleted));
        };

        updateTimers();

        const interval = setInterval(updateTimers, 1000);

        const handleStorageChange = (event) => {
          if (event.key === "timersStarted") updateTimers();
          if (event.key === "completedTimers") updateTimers();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
          clearInterval(interval);
          window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    return (
        <AnalyticsCardContext.Provider value={{
          timersStarted, completedTimers, streak, streakHistory, achievements, selectedTitle, setSelectedTitle
        }}>
          {children}
        </AnalyticsCardContext.Provider>
    );
    
}