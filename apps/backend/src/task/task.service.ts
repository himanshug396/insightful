import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  getTasksByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
    });
  }

  createTask(projectId: string, name: string) {
    return this.prisma.task.create({
      data: {
        name,
        project: { connect: { id: projectId } },
      }
    });
  }
}
