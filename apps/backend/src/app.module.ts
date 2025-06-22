import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { TimeModule } from './time/time.module';
import { ScreenshotModule } from './screenshot/screenshot.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailModule } from './email/email.module';


@Module({
  imports: [
    AuthModule,
    EmployeeModule,
    ProjectModule,
    TaskModule,
    TimeModule,
    ScreenshotModule,
    PrismaModule,
    EmailModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_USER,      // your@gmail.com
          pass: process.env.GMAIL_APP_PASS,  // the generated App Password
        },
      },
      defaults: {
        from: `"Your App Name" <${process.env.GMAIL_USER}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),   // or EjsAdapter, PugAdapter…
        options: { strict: true },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
