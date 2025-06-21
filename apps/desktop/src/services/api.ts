import { Project, TimeEntry, ApiResponse, User } from '../types';

// Mock API service
class ApiService {
  private user: User = {
    id: '1',
    name: 'Himanshu Gupta',
    email: 'himanshugupta396@gmail.com',
    avatar: 'HG',
    company: 'Mercor.io Corporation',
  };

  private projects: Project[] = [
    {
      id: '1',
      name: 'Obsidian-eSWE',
      avatar: 'OB',
      color: '#FF6B35',
      totalTime: '18:17:34',
      weeklyTarget: '40:00 h/week',
      taskCount: 1,
      isActive: true,
    },
    {
      id: '2',
      name: 'React Dashboard',
      avatar: 'RD',
      color: '#4ECDC4',
      totalTime: '12:45:22',
      weeklyTarget: '30:00 h/week',
      taskCount: 3,
      isActive: true,
    }
  ];

  private timeEntries: TimeEntry[] = [
    {
      id: '1',
      projectId: '1',
      startTime: '02:45 PM',
      endTime: '02:51 PM',
      duration: '00:06:11',
      date: 'Fri, 20 Jun',
      isCompleted: true,
    },
    {
      id: '2',
      projectId: '1',
      startTime: '05:03 PM',
      endTime: '05:07 PM',
      duration: '00:04:20',
      date: 'Tue, 17 Jun',
      isCompleted: true,
    },
    {
      id: '3',
      projectId: '1',
      startTime: '12:58 AM',
      endTime: '01:01 AM',
      duration: '00:02:47',
      date: 'Mon, 16 Jun',
      isCompleted: true,
    },
    {
      id: '4',
      projectId: '1',
      startTime: '04:41 PM',
      endTime: '04:44 PM',
      duration: '00:02:50',
      date: 'Fri, 13 Jun',
      isCompleted: true,
    },
    {
      id: '5',
      projectId: '1',
      startTime: '12:53 AM',
      endTime: '12:56 AM',
      duration: '00:02:32',
      date: 'Fri, 13 Jun',
      isCompleted: true,
    },
    {
      id: '6',
      projectId: '1',
      startTime: '12:47 PM',
      endTime: '01:04 PM',
      duration: '00:17:02',
      date: 'Thu, 12 Jun',
      isCompleted: true,
    }
  ];

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: this.user,
        });
      }, 200);
    });
  }

  async getAssignedProjects(): Promise<ApiResponse<Project[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: this.projects,
        });
      }, 500);
    });
  }

  async getProjectTimeEntries(projectId: string): Promise<ApiResponse<TimeEntry[]>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const entries = this.timeEntries.filter(entry => entry.projectId === projectId);
        resolve({
          success: true,
          data: entries,
        });
      }, 300);
    });
  }

  async startTimer(projectId: string): Promise<ApiResponse<{ startTime: string }>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { startTime: new Date().toISOString() },
          message: 'Timer started successfully',
        });
      }, 200);
    });
  }

  async stopTimer(projectId: string, duration: number): Promise<ApiResponse<TimeEntry>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date();
        const startTime = new Date(now.getTime() - duration * 1000);
        
        const newEntry: TimeEntry = {
          id: Date.now().toString(),
          projectId,
          startTime: startTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          endTime: now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          }),
          duration: this.formatDuration(duration),
          date: now.toLocaleDateString('en-US', { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
          }),
          isCompleted: true,
        };

        this.timeEntries.unshift(newEntry);
        
        resolve({
          success: true,
          data: newEntry,
          message: 'Timer stopped successfully',
        });
      }, 200);
    });
  }

  async captureScreenshot(projectId: string): Promise<ApiResponse<{ screenshotId: string }>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { screenshotId: `screenshot_${Date.now()}` },
          message: 'Screenshot captured',
        });
      }, 100);
    });
  }

  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

export const apiService = new ApiService();