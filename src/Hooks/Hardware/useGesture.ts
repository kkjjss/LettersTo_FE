import {useState} from 'react';

export const useGesture = () => {
  const [gestureStartLocation, setGestureStartLocation] = useState<{
    x: number;
    timestamp: number;
  }>({
    x: 0,
    timestamp: 0,
  });

  const onSwipeXStart = (x: number, timestamp: number) => {
    setGestureStartLocation({x, timestamp});
  };

  const onSwipteXEnd = (
    x: number,
    timestamp: number,
    thresholdX: number,
    thresholdTime: number,
    callback: () => void,
  ) => {
    if (
      x - gestureStartLocation.x > thresholdX &&
      timestamp - gestureStartLocation.timestamp < thresholdTime
    ) {
      callback();
    }
  };

  return {onSwipeXStart, onSwipteXEnd};
};
