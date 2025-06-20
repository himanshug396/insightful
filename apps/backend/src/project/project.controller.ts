import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
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
