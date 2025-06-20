import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  getAllProjects() {
    return this.prisma.project.findMany({
      include: { employees: true },
    });
  }

  createProject(data: { name: string; employeeIds: string[] }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        employees: {
          connect: data.employeeIds.map((id) => ({ id })),
        },
      },
    });
  }
}
