import { User } from '@prisma/client';
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async logIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { email, password } = authCredentialsDto;
    const user: User = await this.authService.getUser({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = this.jwtService.sign({ email });
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken,
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('/signUp')
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

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
