import { Prisma, Task, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateTodoDto } from './dto/createtodo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data,
    });
  }

  async getAllTodo(where: Prisma.TaskWhereInput): Promise<Task[]> {
    return this.prisma.task.findMany({
      where,
    });
  }

  async updateTodo(
    where: Prisma.TaskWhereUniqueInput,
    data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    return this.prisma.task.update({
      where,
      data,
    });
  }
}
