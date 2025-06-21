import { useState, useEffect, useRef } from 'react';
import { Timer } from '../types';
import { apiService } from '../services/api';

export const useTimer = () => {
  const [timer, setTimer] = useState<Timer>({
    projectId: null,
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
        if (timer.projectId) {
          try {
            await apiService.captureScreenshot(timer.projectId);
            console.log('Screenshot captured');
          } catch (error) {
            console.error('Failed to capture screenshot:', error);
          }
        }
      }, 60000); // 60 seconds

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (screenshotIntervalRef.current) clearInterval(screenshotIntervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (screenshotIntervalRef.current) clearInterval(screenshotIntervalRef.current);
    }
  }, [timer.isRunning, timer.startTime, timer.projectId]);

  const startTimer = async (projectId: string) => {
    try {
      const response = await apiService.startTimer(projectId);
      if (response.success) {
        const startTime = new Date();
        setTimer({
          projectId,
          isRunning: true,
          startTime,
          elapsedTime: 0,
        });
      }
    } catch (error) {
      console.error('Failed to start timer:', error);
    }
  };

  const stopTimer = async () => {
    if (!timer.projectId || !timer.isRunning) return;

    try {
      const response = await apiService.stopTimer(timer.projectId, timer.elapsedTime);
      if (response.success) {
        setTimer({
          projectId: null,
          isRunning: false,
          startTime: null,
          elapsedTime: 0,
        });
        return response.data;
      }
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