import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './services/prisma.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, TodoModule],
  controllers: [],
  providers: [PrismaService],
  exports: [],
})
export class AppModule {}
