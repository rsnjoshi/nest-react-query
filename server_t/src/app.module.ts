import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [PrismaService],
  exports: [],
})
export class AppModule {}
