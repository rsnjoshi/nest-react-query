import { Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async addUser(data: Prisma.UserCreateInput): Promise<User> {
    const { password } = data;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    data.password = hashedPassword;
    return this.prisma.user.create({ data });
  }
}
