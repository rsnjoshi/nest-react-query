import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from './status.enum';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  description: string;

  fileLocation?: string;
}
