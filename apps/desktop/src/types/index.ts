export interface Project {
  id: string;
  name: string;
  avatar: string;
  color: string;
  totalTime: string;
  weeklyTarget: string;
  taskCount: number;
  isActive: boolean;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  startTime: string;
  endTime: string;
  duration: string;
  date: string;
  isCompleted: boolean;
}

export interface Timer {
  projectId: string | null;
  isRunning: boolean;
  startTime: Date | null;
  elapsedTime: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
}