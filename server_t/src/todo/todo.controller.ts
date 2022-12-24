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

@Controller('tasks')
@UseGuards(AuthGuard())
export class TodoController {
  @Get()
  getAllTask(): string {
    return 'all todo';
  }

  @Post()
  createTask(@Body() data: CreateTodoDto): string {
    console.log(data);
    return 'created';
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
