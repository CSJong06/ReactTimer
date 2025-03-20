import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

//get streakHistory from localstorage
const StreakChart = ({ streakHistory }) => {

    return (
        <div className="streak-chart">
            <h3>Streak History</h3>
            {streakHistory.length === 0 ? (
                <p>No data available</p> // Shows if history is empty
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={streakHistory}>
                    <XAxis dataKey="date" /> {/* Shows dates along the x-axis */}
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name, props) => {
                        const date = props.payload.date; // Get the date from the hovered data point
                        return [`${value} 🔥`, `Date: ${date}`]; // Show both streak count & date
                      }} 
                    />
                    <Line type="monotone" dataKey="streak" stroke="#ff5680" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};


export default StreakChart;
