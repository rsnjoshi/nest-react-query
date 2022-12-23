import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
@Injectable()
export class AuthService {
  async logIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentialsDto;
    if (email && password) return 'loggedIn';
    return 'login failed';
  }
}
