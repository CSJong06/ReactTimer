import { createContext, useContext, useEffect, useState } from "react";

const TimerDataContext = createContext();

export const TimerDataProvider = ({ children }) => {
  const [monthlyData, setMonthlyData] = useState(() => {
    return JSON.parse(localStorage.getItem("monthlyTimers")) || [];
  });

  const updateMonthlyData = (type) => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const updatedData = monthlyData.map(entry => ({ ...entry }));

    const existingEntry = updatedData.find(entry => entry.month === currentMonth);

    if (existingEntry) {
      existingEntry[type] += 1;
    } else {
      updatedData.push({
        month: currentMonth,
        started: type === "started" ? 1 : 0,
        completed: type === "completed" ? 1 : 0,
      });
    }

    setMonthlyData([...updatedData]); // ✅ Triggers useEffect
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
