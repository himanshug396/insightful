import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ScreenshotService {
  constructor(private prisma: PrismaService) {}

  
  async uploadScreenshot(
    employeeId: string,
    taskId: string,
    file: Express.Multer.File,
  ) {
    const filename = randomUUID();
    return this.prisma.screenshot.create({
      data: {
        employeeId,
        fileName: filename,
        taskId: taskId,
        takenAt: new Date()
      }
    });
  }

  async getScreenshots(employeeId: string) {
    return this.prisma.screenshot.findMany({
      where: { employeeId },
      orderBy: { takenAt: 'desc' }
    });
  }
}
