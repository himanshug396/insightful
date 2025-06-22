import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeController } from './employee.controller';
import { TimeModule } from 'src/time/time.module';

@Module({
  imports: [PrismaModule, TimeModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
