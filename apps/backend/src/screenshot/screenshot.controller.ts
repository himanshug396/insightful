import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';

@Controller('screenshots')
export class ScreenshotController {
  constructor(private readonly screenshotService: ScreenshotService) {}

  @Post()
  async upload(@Body() body: {
    employeeId: string;
    imageUrl: string;
    permission: boolean;
  }) {
    return this.screenshotService.uploadScreenshot(
      body.employeeId,
      body.imageUrl,
      body.permission
    );
  }

  @Get(':employeeId')
  async list(@Param('employeeId') employeeId: string) {
    return this.screenshotService.getScreenshots(employeeId);
  }
}
