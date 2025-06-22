import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAll() {
    return this.projectService.getAllProjects();
  }

  @Post()
  async create(@Body() body: { name: string; employeeIds: string[] }) {
    return this.projectService.createProject(body);
  }
}
