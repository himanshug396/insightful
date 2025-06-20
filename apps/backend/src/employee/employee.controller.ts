import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Post('activate')
  async activate(@Body() body: { token: string; password: string }) {
    return this.employeeService.activateEmployee(body.token, body.password);
  }
}
