import React, { useEffect, useState } from "react";

const Timer = ({ callQueuedTime }) => {
  const [time, setTime] = useState(() => new Date().getTime());
  useEffect(() => {
    const queuedTime = new Date(callQueuedTime).getTime();
    const intervalId = setInterval(function () {
      setTime(new Date().getTime() - queuedTime);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [callQueuedTime]);
  return <p className="timer">{parseInt(time / 1000)}</p>;
};

export default Timer;
