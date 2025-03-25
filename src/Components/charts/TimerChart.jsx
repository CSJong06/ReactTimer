import { useTimerData } from "../context/TimerDataContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TimerBarChart = () => {
  const { monthlyData } = useTimerData();
  const hasData = monthlyData.length > 0;

  return (
    <div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis domain={[0, 'dataMax + 5']} />

            <Tooltip />
            <Legend />
            <Bar dataKey="started" fill="#ff5680" name="Timers Started" />
            <Bar dataKey="completed" fill="#f11e53" name="Timers Completed" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TimerBarChart;
