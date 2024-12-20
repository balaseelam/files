import React, { useState, useEffect } from 'react';

function Clock({ time }) {
  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  const [secondAngle, setSecondAngle] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const [hour, minute, second] = time.split(':').map(parseFloat);
      const hourAngle = (hour % 12) * 30 + minute / 2;
      const minuteAngle = minute * 6 + second / 10;
      const secondAngle = second * 6;
      setHourAngle(hourAngle);
      setMinuteAngle(minuteAngle);
      setSecondAngle(secondAngle);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [time]);

  // Calculate the position of numbers on the clock
  const numbers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i - 3) * 30; // Rotate by 90 degrees counter-clockwise
    const x = 100 + 70 * Math.cos(angle * (Math.PI / 180));
    const y = 100 + 70 * Math.sin(angle * (Math.PI / 180));
    numbers.push(
      <text key={i} x={x} y={y} textAnchor="middle" alignmentBaseline="middle">
        {i}
      </text>
    );
  }

  return (
    <div className="clock">
      <svg width="200" height="200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="black" strokeWidth="4" />
        {/* Hour marks */}
        {numbers}
        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2={`${
            100 + 40 * Math.cos((hourAngle - 90) * (Math.PI / 180))
          }`}
          y2={`${
            100 + 40 * Math.sin((hourAngle - 90) * (Math.PI / 180))
          }`}
          stroke="black"
          strokeWidth="6"
        />
        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2={`${
            100 + 60 * Math.cos((minuteAngle - 90) * (Math.PI / 180))
          }`}
          y2={`${
            100 + 60 * Math.sin((minuteAngle - 90) * (Math.PI / 180))
          }`}
          stroke="black"
          strokeWidth="4"
        />
        {/* Second hand */}
        <line
          x1="100"
          y1="100"
          x2={`${
            100 + 70 * Math.cos((secondAngle - 90) * (Math.PI / 180))
          }`}
          y2={`${
            100 + 70 * Math.sin((secondAngle - 90) * (Math.PI / 180))
          }`}
          stroke="red"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default Clock;
