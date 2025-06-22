export interface Project {
  id: string;
  employeeId: string;
  name: string;
  totalTime: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  employeeId: string;
  startTime: string;
  endTime: string;
}

export interface Timer {
  taskId: string | null;
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
  userId: string;
  name: string;
  email: string;
}
