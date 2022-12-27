import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail({}, { message: 'not valid' })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
