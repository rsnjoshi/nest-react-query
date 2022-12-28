import { User } from '@prisma/client';
import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import SwaggerObject from './swagger'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Authentication Module')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  @ApiBody(SwaggerObject.login.body)
  @ApiOperation(SwaggerObject.login.operation)
  @ApiResponse(SwaggerObject.login.response.err_400)
  @ApiResponse(SwaggerObject.login.response.err_401)
  @ApiResponse(SwaggerObject.login.response.created_201)
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
  @ApiBody(SwaggerObject.signUp.body)
  @ApiOperation(SwaggerObject.signUp.operation)
  @ApiResponse(SwaggerObject.signUp.response.err_400)
  @ApiResponse(SwaggerObject.signUp.response.created_201)
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
