import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ScreenshotService } from './screenshot.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';


@Controller('screenshots')
export class ScreenshotController {
  constructor(private readonly screenshotService: ScreenshotService) {}

  @Post(':employeeId/:taskId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = join(process.cwd(), 'uploads');
        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExt = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
      },
    }),
  }))
  async uploadFile(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
    @Param('employeeId') employeeId: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.screenshotService.uploadScreenshot(
      employeeId,
      taskId,
      file,
    );
  }

  @Get(':employeeId')
  async list(@Param('employeeId') employeeId: string) {
    return this.screenshotService.getScreenshots(employeeId);
  }
}
