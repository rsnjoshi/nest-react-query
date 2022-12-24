import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule {}
