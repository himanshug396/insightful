import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Check, Play, Square } from 'lucide-react';
import { Project, TimeEntry } from '../types';
import { apiService } from '../services/api';
import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/time';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { timer, startTimer, stopTimer } = useTimer(project.task.id, project.employeeId);

  useEffect(() => {
    fetchTimeEntries();
  }, [project.id]);

  const fetchTimeEntries = async () => {
    setLoading(true);
    try {
      const response = await apiService.getProjectTimeEntries(project.id, project.employeeId);
      setTimeEntries(response);
    } catch (error) {
      console.error('Failed to fetch time entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimerToggle = async () => {
    if (timer.isRunning && timer.taskId === project.task.id) {
      const newEntry = await stopTimer(project.task.id, project.employeeId);
      if (newEntry) {
        const response = await apiService.getProjectTimeEntries(project.id, project.employeeId);
        setTimeEntries(response);
      }
    } else {
      await startTimer(project.task.id, project.employeeId);
    }
  };

  const isCurrentProjectRunning = timer.isRunning && timer.taskId === project.task.id;

  const filteredEntries = timeEntries;

  const formatLastSync = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-indigo-600" />
          </button>
          <span className="text-indigo-600 font-medium text-sm uppercase tracking-wide">
            PROJECTS
          </span>
        </div>

        {/* Project Info */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 font-medium">{40}</p>
            <div className="flex items-center space-x-3">
              {isCurrentProjectRunning && (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-mono text-lg font-medium">
                    {formatTime(timer.elapsedTime)}
                  </span>
                </div>
              )}
              <button
                onClick={handleTimerToggle}
                className={`p-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isCurrentProjectRunning
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isCurrentProjectRunning ? (
                  <>
                    <Square className="h-4 w-4" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Start</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Time Entries */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {formatLastSync(new Date(entry.startTime))} - {formatLastSync(new Date(entry.endTime))}
                    </p>
                    <p className="text-gray-600 mt-1">{formatLastSync((new Date(entry.startTime)))}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-2xl font-bold text-indigo-600">
                      {entry.duration}
                    </span>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;