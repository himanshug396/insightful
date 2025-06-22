import React, { useState, useEffect } from 'react';
import WindowHeader from './components/WindowHeader';
import { RefreshCw } from 'lucide-react';
import ProjectsList from './components/ProjectsList';
import ProjectDetail from './components/ProjectDetail';
import { Project, User } from './types';
import { apiService } from './services/api';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentView, setCurrentView] = useState<'projects' | 'detail'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSync, setLastSync] = useState<Date>(new Date());

  useEffect(() => {
    fetchUser();
    setLastSync(new Date());
  }, []);

  const fetchUser = async () => {
    try {
      const token = await apiService.login();
      console.log("🚀 ~ fetchUser ~ token:", token)
      const userResponse = await apiService.getCurrentUser();
      console.log("🚀 ~ fetchUser ~ userResponse:", userResponse)
      localStorage.setItem("userId", userResponse.userId);
      setUser(userResponse);
      await fetchProjects(userResponse.userId);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async (userId: string) => {
    setLoading(true);
    try {
      const response = await apiService.getAssignedProjects(userId);
      setProjects(response);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('detail');
  };

  const handleBackToProjects = () => {
    setCurrentView('projects');
    setSelectedProject(null);
  };

  const formatLastSync = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <WindowHeader user={user} />
      <div className="flex-1" style={{ zoom: "70%", paddingBottom: "200px"}}>
        {currentView === 'projects' ? (
          <ProjectsList projects={projects} onProjectSelect={handleProjectSelect} />
        ) : selectedProject ? (
          <ProjectDetail 
            project={selectedProject}
            onBack={handleBackToProjects} 
          />
        ) : null}
      </div>
      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 p-6 flex items-center justify-between" style={{ position: "fixed", bottom:"0", width: "100%", zoom: "70%"}}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Last sync</p>
            <p className="text-sm font-medium text-gray-900">
              Today at {formatLastSync(lastSync).split(' ').slice(-2).join(' ')}
            </p>
          </div>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200">
          Open Dashboard
        </button>
      </div>
    </div>
  );
}

export default App;