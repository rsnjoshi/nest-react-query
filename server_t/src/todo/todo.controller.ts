import { Task } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto } from './dto/createtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { TaskList } from './interface/taskList.interface';
import { TodoService } from './todo.service';
import SwaggerObject from './swagger';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Task Operation Module')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/:id')
  @ApiOperation(SwaggerObject.getTask.operation)
  @ApiParam(SwaggerObject.getTask.param)
  @ApiResponse(SwaggerObject.getTask.response.err_400)
  @ApiResponse(SwaggerObject.getTask.response.err_401)
  @ApiResponse(SwaggerObject.getTask.response.task_200)
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
  @ApiOperation(SwaggerObject.createTask.operation)
  @ApiResponse(SwaggerObject.createTask.response.created_201)
  @ApiResponse(SwaggerObject.createTask.response.err_400)
  @ApiResponse(SwaggerObject.createTask.response.err_401)
  @ApiBody(SwaggerObject.createTask.body)
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

  @ApiOperation({
    summary: 'Updates a task with given id',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'unique task id',
    required: true,
  })
  @Put('/:id')
  @ApiOperation(SwaggerObject.updateTask.operation)
  @ApiBody(SwaggerObject.updateTask.body)
  @ApiResponse(SwaggerObject.updateTask.response.err_401)
  @ApiResponse(SwaggerObject.updateTask.response.err_400)
  @ApiResponse(SwaggerObject.updateTask.response.updated_200)
  @ApiParam(SwaggerObject.updateTask.param)
  updateTask(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Task> {
    return this.todoService.updateTodo({ id: +id }, { ...updateTodoDto });
  }

  @Delete('/:id')
  @ApiOperation(SwaggerObject.deleteTask.operation)
  @ApiResponse(SwaggerObject.deleteTask.response.err_400)
  @ApiResponse(SwaggerObject.deleteTask.response.err_401)
  @ApiResponse(SwaggerObject.deleteTask.response.deleted_200)
  @ApiParam(SwaggerObject.deleteTask.param)
  deleteTask(@Param('id') id: string): Promise<Task> {
    console.log(id);
    return this.todoService.updateTodo({ id: +id }, { delete: true });
  }
}
