import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  getTasksByProject(projectId: string) {
    return this.prisma.task.findMany({
      where: { projectId },
      include: { employees: true }
    });
  }

  createTask(projectId: string, name: string, employeeIds: string[]) {
    return this.prisma.task.create({
      data: {
        name,
        project: { connect: { id: projectId } },
        employees: {
          connect: employeeIds.map(id => ({ id }))
        }
      }
    });
  }
}
