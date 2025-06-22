import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';
import { UseFileInterceptor } from './interceptor';

@Controller('screenshots')
export class ScreenshotController {
  constructor(private readonly screenshotService: ScreenshotService) {}

  @Post('')
  @UseFileInterceptor('file')
  async uploadPoaFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Body()
    body: {
      employeeId: string;
      taskId: string;
    },
  ) {
    return await this.screenshotService.uploadScreenshot(
      body.employeeId,
      body.taskId,
      file,
    );
  }

  @Get(':employeeId')
  async list(@Param('employeeId') employeeId: string) {
    return this.screenshotService.getScreenshots(employeeId);
  }
}
