import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Todo REST API')
    .setDescription('Complete available apis for TODO app')
    .setVersion('1.0')
    .addTag('REST-API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3500);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
