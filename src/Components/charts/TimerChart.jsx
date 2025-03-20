import { useTimerData } from "../context/TimerDataContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TimerBarChart = () => {
  const { monthlyData } = useTimerData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="started" fill="#ff5680" name="Timers Started" />
        <Bar dataKey="completed" fill="#f11e53" name="Timers Completed" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TimerBarChart;
