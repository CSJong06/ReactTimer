
import { createContext, useContext, useEffect, useState } from "react";

const TimerDataContext = createContext();

export const TimerDataProvider = ({ children }) => {
  const [monthlyData, setMonthlyData] = useState(() => {
    return JSON.parse(localStorage.getItem("monthlyTimers")) || [];
  });

  const updateMonthlyData = (type, TimerLength) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const updatedData = monthlyData.map(entry => ({ ...entry }));

    const existingEntry = updatedData.find(entry => entry.month === currentMonth);

    if (existingEntry) {
      existingEntry[type] += 1;
      existingEntry.timers.push(TimerLength);  // ✅ Store timer length
    } else {
      updatedData.push({
        month: currentMonth,
        started: type === "started" ? 1 : 0,
        completed: type === "completed" ? 1 : 0,
        timers: [TimerLength]  // ✅ Initialize array with first value
      });
    }

    setMonthlyData([...updatedData]); // ✅ Triggers useEffect
    localStorage.setItem("monthlyTimers", JSON.stringify(updatedData)); // ✅ Persist in storage
  };

  // ✅ Sync localStorage only when state changes
  useEffect(() => {
    localStorage.setItem("monthlyTimers", JSON.stringify(monthlyData));
  }, [monthlyData]);  // ✅ Runs only when `monthlyData` updates

  return (
    <TimerDataContext.Provider value={{ monthlyData, updateMonthlyData }}>
      {children}
    </TimerDataContext.Provider>
  );
};

export const useTimerData = () => useContext(TimerDataContext);
