import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);
  const john = await prisma.employee.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
      password,
      active: true,
      activationToken: randomUUID(),
    },
  });

  const jane = await prisma.employee.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password,
      active: true,
      activationToken: randomUUID(),
    },
  });

  const project = await prisma.project.create({
    data: {
      name: 'Mercor MVP',
      employees: {
        connect: [{ id: john.id }, { id: jane.id }],
      },
    },
  });

  const task = await prisma.task.create({
    data: {
      name: 'Default Task',
      projectId: project.id,
    },
  });

  const start = new Date();
  start.setHours(0);
  await prisma.timeLog.create({
    data: {
      startTime: start,
      endTime: new Date(),
      taskId: task.id,
      employeeId: john.id,
    }
  });
}

main()
  .then(() => {
    console.log('✅ Seed complete');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
