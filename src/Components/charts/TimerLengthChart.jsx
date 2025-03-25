import { useTimerData } from "../context/TimerDataContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const processTimerData = (monthlyData) => {
    const categories = {
      "Under 1 min": 0,
      "1-5 min": 0,
      "5-10 min": 0,
      "10+ min": 0
    };
  
    // Loop through each month's data
    monthlyData.forEach(entry => {
      entry.timers.forEach(time => {
        if (time < 60) categories["Under 1 min"]++;
        else if (time < 300) categories["1-5 min"]++;
        else if (time < 600) categories["5-10 min"]++;
        else categories["10+ min"]++;
      });
    });
  
    // Convert categories object into array format for the pie chart
    return Object.keys(categories).map(key => ({
      name: key,
      value: categories[key]
    }));
};


const TimerLengthChart = () => {
    const { monthlyData } = useTimerData(); // Get stored data
    const hasData = monthlyData.length > 0;
    const chartData = processTimerData(monthlyData); // Transform it for PieChart
  
    const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"]; // Colors for segments
  
    return hasData ? (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie 
            data={chartData} 
            cx="50%" 
            cy="50%" 
            outerRadius={100} 
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    ) : (
      <p>No data available</p>
    );
  };
  

export default TimerLengthChart;
