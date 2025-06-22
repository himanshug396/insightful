import React, { useState } from 'react';
import { Search, ChevronRight, Clock } from 'lucide-react';
import { Project } from '../types';

interface ProjectsListProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onProjectSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-6">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search projects"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-600 mb-4">Assigned Projects</h2>
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                      style={{ backgroundColor: "aqua" }}
                    >
                      {project.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {project.name}
                        </h3>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-2xl font-mono text-gray-700 mt-1">
                        {project.totalTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-indigo-600 font-medium text-sm">
                        {project.tasks.length} TASK{project.tasks.length !== 1 ? 'S' : ''}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;