import { User } from '.prisma/client';
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async logIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { email } = authCredentialsDto;
    const user: User = await this.authService.getUser({ email });
    if (user) {
      return {
        id: user.id,
        username: user.username,
      };
    } else {
      throw new NotFoundException();
    }
  }

  @Post('/signUp')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() registrationDto: RegistrationDto): Promise<any> {
    try {
      const user: User = await this.authService.addUser(registrationDto);
      return {
        id: user.id,
        username: user.username,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Conflict encountered', {
          cause: new Error(error),
          description: 'Email Exists',
        });
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
