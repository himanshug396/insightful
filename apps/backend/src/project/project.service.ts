import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  getAllProjects() {
    return this.prisma.project.findMany({
      include: { employees: true },
    });
  }

  async createProject(data: { name: string; employeeIds: string[] }) {
    const project = await this.prisma.project.create({
      data: {
        name: data.name,
        employees: {
          connect: data.employeeIds.map((id) => ({ id })),
        },
      },
      include: {
        employees: {
          select: {
            name: true,
            email: true,
            activationToken: true,
          },
        },
      },
    });

    await Promise.allSettled(
      project.employees.map((e) => {
        this.emailService.sendAlert(e.email, e.name, e.activationToken ?? '');
      }),
    );
    return project;
  }
}
