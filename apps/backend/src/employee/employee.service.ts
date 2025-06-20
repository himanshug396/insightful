import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  getAllEmployees() {
    return this.prisma.employee.findMany();
  }

  async activateEmployee(token: string, password: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { activationToken: token }
    });

    if (!employee) throw new Error('Invalid token');

    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.employee.update({
      where: { id: employee.id },
      data: {
        password: hashed,
        activationToken: null,
        active: true
      }
    });
  }
}
