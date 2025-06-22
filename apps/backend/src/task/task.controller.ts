import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('projects/:projectId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(@Param('projectId') projectId: string) {
    return this.taskService.getTasksByProject(projectId);
  }

  @Post()
  async create(
    @Param('projectId') projectId: string,
    @Body() body: { name: string }
  ) {
    return this.taskService.createTask(projectId, body.name);
  }
}
