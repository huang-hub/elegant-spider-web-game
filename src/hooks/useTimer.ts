
import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';

export const useTimer = () => {
  const { isGameStarted, isGameComplete, incrementTime } = useGameStore();

  useEffect(() => {
    if (!isGameStarted || isGameComplete) return;

    const timer = setInterval(() => {
      incrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStarted, isGameComplete, incrementTime]);
};
