import { useState, useEffect, useRef } from 'react';
import { Timer } from '../types';
import { apiService } from '../services/api';

export const useTimer = () => {
  const [timer, setTimer] = useState<Timer>({
    taskId: null,
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const screenshotIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.isRunning && timer.startTime) {
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - timer.startTime!.getTime()) / 1000);
        setTimer(prev => ({ ...prev, elapsedTime: elapsed }));
      }, 1000);

      // Capture screenshot every minute
      screenshotIntervalRef.current = setInterval(async () => {
        if (timer.taskId) {
          try {
            await apiService.captureScreenshot(timer.taskId);
            console.log('Screenshot captured');
          } catch (error) {
            console.error('Failed to capture screenshot:', error);
          }
        }
      }, 10000); // 10 seconds

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (screenshotIntervalRef.current) clearInterval(screenshotIntervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (screenshotIntervalRef.current) clearInterval(screenshotIntervalRef.current);
    }
  }, [timer.isRunning, timer.startTime, timer.taskId]);

  const startTimer = async (taskId: string, userId: string) => {
    try {
      const response = await apiService.startTimer(taskId, userId);
      const startTime = new Date();
        setTimer({
          taskId,
          isRunning: true,
          startTime,
          elapsedTime: 0,
        });
      return response;
    } catch (error) {
      console.error('Failed to start timer:', error);
    }
  };

  const stopTimer = async (taskId: string, userId: string) => {
    if (!timer.taskId || !timer.isRunning) return;

    try {
      const response = await apiService.stopTimer(taskId, userId);
      setTimer({
        taskId: null,
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
      });
      return response;
    } catch (error) {
      console.error('Failed to stop timer:', error);
    }
  };

  return {
    timer,
    startTimer,
    stopTimer,
  };
};