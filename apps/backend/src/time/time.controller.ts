import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('timelogs')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post('start')
  async startLog(@Body() body: { employeeId: string; taskId: string }) {
    return this.timeService.startLog(body.employeeId, body.taskId);
  }

  @Post('stop')
  async stopLog(@Body() body: { employeeId: string; taskId: string }) {
    return this.timeService.stopLog(body.employeeId, body.taskId);
  }

  @Get(':projectId/:employeeId')
  async getLogs(@Param('projectId') projectId: string, @Param('employeeId') employeeId: string) {
    return this.timeService.getLogsForEmployee(projectId, employeeId);
  }
}
