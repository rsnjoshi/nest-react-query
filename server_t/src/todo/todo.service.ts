import { Prisma, Task, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateTodoDto } from './dto/createtodo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(payload: CreateTodoDto): Promise<Task> {
    const data: Prisma.TaskCreateInput = {
      title: payload.title,
      status: payload.status,
      description: payload.description,
      fileLocation: payload.fileLocation,
      delete: false,
      user: {
        connect: { id: +payload.userId },
      },
    };
    return this.prisma.task.create({
      data,
    });
  }

  async getTodo(where: Prisma.TaskWhereInput): Promise<Task[]> {
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
