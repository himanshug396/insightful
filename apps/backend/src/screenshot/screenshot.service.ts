import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScreenshotService {
  constructor(private prisma: PrismaService) {}

  
  async uploadScreenshot(
    employeeId: string,
    taskId: string,
    file: Express.Multer.File,
  ) {
    return await this.prisma.screenshot.create({
      data: {
        employeeId,
        fileName: file.path,
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
