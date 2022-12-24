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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto } from './dto/createtodo.dto';
import { UpdateStatusDto } from './dto/updatestatus.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { TaskList } from './interface/taskList.interface';
import { TodoService } from './todo.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/:id')
  async getAllTask(@Param('id') id: string): Promise<TaskList> {
    const tasks: Task[] = await this.todoService.getAllTodo({
      userId: +id,
      delete: false,
    });
    const complete: Task[] = tasks.filter(
      (task) => task.status === 'COMPLETED',
    );
    const notStarted: Task[] = tasks.filter(
      (task) => task.status === 'NOT_STARTED',
    );
    return {
      complete,
      notStarted,
    };
  }

  @Post()
  async createTask(@Body() data: CreateTodoDto): Promise<Task> {
    const payload = {
      title: data.title,
      status: data.status,
      description: data.description,
      fileLocation: data.fileLocation,
      delete: false,
      user: {
        connect: { id: +data.userId },
      },
    };
    return this.todoService.createTodo(payload);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Task> {
    return this.todoService.updateTodo({ id: +id }, { ...updateTodoDto });
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    console.log(id);
    return this.todoService.updateTodo({ id: +id }, { delete: true });
  }
}
