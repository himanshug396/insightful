import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TimeModule } from './time/time.module';
import { ScreenshotModule } from './screenshot/screenshot.module';

@Module({
  imports: [AuthModule, EmployeeModule, ProjectModule, TaskModule, TimeModule, ScreenshotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
