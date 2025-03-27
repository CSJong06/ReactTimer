import React, {useContext} from "react";

//grab the current progress from the state
const getNextMilestone = (currentValue) => {
  // milestones
  const milestones = [
      { value: 5 },
      { value: 10 },
      { value: 15 }
  ];
  // find the milestone with a larger value than the current value
  return milestones.find(milestone => currentValue < milestone.value) || null;
};

// grab the current progress from the state
const ProgressBar = ({ currentValue }) => {
  // get the next milestone
  const nextMilestone = getNextMilestone(currentValue);

  // If all milestones have been reached, return all achievements unlocked
  if (!nextMilestone || currentValue > nextMilestone.value) 
  return <p>All achievements unlocked!</p>;

  // progress is current value over the next milestone value
  const progress = Math.min((currentValue / nextMilestone.value) * 100, 100);

    return (
      <div className="progress-container">
        <p> {currentValue}/{nextMilestone.value}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
};

export default ProgressBar;
