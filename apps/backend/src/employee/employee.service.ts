import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { randomUUID } from 'crypto';
import { TimeService } from 'src/time/time.service';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private timeService: TimeService,
  ) {}

  getAllEmployees() {
    return this.prisma.employee.findMany();
  }

  async getEmployeeProjects(id: string) {
    const projects = (
      await this.prisma.employee.findUniqueOrThrow({
        where: { id: id },
        include: {
          projects: {
            include: {
              task: true,
            },
          },
        },
      })
    ).projects;
    const timeMap = await this.timeService.getTimeForProject(id);
    return projects.map((project) => {
      return {
        totalTime: moment(timeMap[project.id] ?? 0).format('HH:mm'),
        id: project.id,
        name: project.name,
        task: project.task[0], // consider 1:1 mapping
        employeeId: id,
      };
    });
  }

  async addEmployee(dto: { name: string; email: string }) {
    return this.prisma.employee.create({
      data: {
        name: dto.name,
        email: dto.email,
        activationToken: randomUUID(),
      },
    });
  }

  async activateEmployee(token: string, email: string, password: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { activationToken: token, email: email },
    });

    if (!employee) throw new Error('Invalid token');

    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.employee.update({
      where: { id: employee.id },
      data: {
        password: hashed,
        active: true,
      },
    });
  }
}
