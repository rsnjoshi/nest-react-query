import { Task } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto } from './dto/createtodo.dto';
import { UpdateStatusDto } from './dto/updatestatus.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { TodoService } from './todo.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTask(): string {
    return 'all todo';
  }

  @Post()
  async createTask(@Body() data: CreateTodoDto): Promise<Task> {
    const payload = {
      ...data,
      delete: false,
    };
    return this.todoService.createTodo(payload);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): string {
    console.log(id);
    console.log(updateTodoDto);
    return 'updated';
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): string {
    console.log(id);
    return 'deleted';
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: string,
    @Body() updateStatus: UpdateStatusDto,
  ): string {
    console.log(id);
    console.log(updateStatus);
    return 'status updated';
  }
}
