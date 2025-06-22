import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Post('')
  async addNewEmployee(@Body() body: {
    name: string;
    email: string;
  }) {
    return this.employeeService.addEmployee(body);
  }

  @Post('activate')
  async activate(@Body() body: { token: string; email: string; password: string }) {
    return this.employeeService.activateEmployee(body.token, body.email, body.password);
  }
}
