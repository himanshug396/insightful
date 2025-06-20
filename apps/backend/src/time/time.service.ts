import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimeService {
  constructor(private prisma: PrismaService) {}

  async startLog(employeeId: string, taskId: string) {
    return this.prisma.timeLog.create({
      data: {
        employeeId,
        taskId,
        startTime: new Date()
      }
    });
  }

  async stopLog(employeeId: string) {
    const activeLog = await this.prisma.timeLog.findFirst({
      where: {
        employeeId,
        endTime: null
      },
      orderBy: { startTime: 'desc' }
    });

    if (!activeLog) {
      throw new Error('No active time log found');
    }

    return this.prisma.timeLog.update({
      where: { id: activeLog.id },
      data: { endTime: new Date() }
    });
  }

  async getLogsForEmployee(employeeId: string) {
    return this.prisma.timeLog.findMany({
      where: { employeeId },
      include: { task: true }
    });
  }
}
