import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment';

@Injectable()
export class TimeService {
  constructor(private prisma: PrismaService) {}

  async startLog(employeeId: string, taskId: string) {
    return this.prisma.timeLog.create({
      data: {
        employeeId,
        taskId,
        startTime: new Date(),
      },
    });
  }

  async stopLog(employeeId: string, taskId: string) {
    const activeLog = await this.prisma.timeLog.findFirst({
      where: {
        employeeId,
        taskId,
        endTime: null,
      },
      orderBy: { startTime: 'desc' },
    });

    if (!activeLog) {
      throw new Error('No active time log found');
    }

    return this.prisma.timeLog.update({
      where: { id: activeLog.id },
      data: { endTime: new Date() },
    });
  }

  async getLogsForEmployee(projectId: string, employeeId: string) {
    const logs = await this.prisma.timeLog.findMany({
      where: { employeeId, task: { projectId: projectId } },
      orderBy: {
        startTime: 'desc',
      },
    });

    return logs.map((log) => {
      return {
        id: log.id,
        employeeId: log.employeeId,
        startTime: log.startTime,
        endTime: log.endTime,
        taskId: log.taskId,
        duration: log.endTime
          ? moment(Number(log.endTime) - Number(log.startTime)).format('HH:mm:ss')
          : '-',
      };
    });
  }

  async getTimeForProject(employeeId: string) {
    const logs = await this.prisma.timeLog.findMany({
      where: { employeeId, endTime: { not: null } },
      include: {
        task: {
          select: { projectId: true },
        },
      },
    });
    const projectTotalTimeMap: Map<string, number> = new Map<string, number>();
    logs.map((log) => {
      if (log.task.projectId) {
        if (!projectTotalTimeMap[log.task.projectId]) {
          projectTotalTimeMap[log.task.projectId] = 0;
        }
        projectTotalTimeMap[log.task.projectId] +=
          Number(log.endTime) - Number(log.startTime);
      }
    });
    return projectTotalTimeMap;
  }
}
