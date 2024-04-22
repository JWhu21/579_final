// Countdown.js
import React from 'react';
import useCountdown from './useCountdown';

const Countdown = ({ deadline }) => {
  const timeLeft = useCountdown(deadline);

  if (!deadline || !timeLeft) {
    return <span>No Deadline or Passed Deadline</span>;
  }

  return (
    <span>
      {timeLeft.days} Days, {timeLeft.hours} Hours, {timeLeft.minutes} Minutes, {timeLeft.seconds} Seconds
    </span>
  );
};

export default Countdown;
