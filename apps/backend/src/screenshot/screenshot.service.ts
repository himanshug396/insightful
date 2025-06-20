import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScreenshotService {
  constructor(private prisma: PrismaService) {}

  async uploadScreenshot(
    employeeId: string,
    imageUrl: string,
    permission: boolean
  ) {
    return this.prisma.screenshot.create({
      data: {
        employeeId,
        imageUrl,
        permission,
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
