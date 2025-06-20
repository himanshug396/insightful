import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScreenshotController } from './screenshot.controller';
import { ScreenshotService } from './screenshot.service';

@Module({
  imports: [PrismaModule],
  controllers: [ScreenshotController],
  providers: [ScreenshotService]
})
export class ScreenshotModule {}
