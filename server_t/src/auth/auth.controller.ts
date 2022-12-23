import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  @Post('/login')
  @UsePipes(new ValidationPipe())
  logIn(@Body() authCredentialsDto: AuthCredentialsDto): string {
    const { email, password } = authCredentialsDto;
    return email + ' ' + password;
  }

  @Post('/signUp')
  @UsePipes(new ValidationPipe())
  signUp(@Body() registrationDto: RegistrationDto): RegistrationDto {
    const { email, password, firstName, lastName, username } = registrationDto;
    return registrationDto;
  }
}
