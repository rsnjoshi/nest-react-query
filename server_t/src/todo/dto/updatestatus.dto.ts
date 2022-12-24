import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from './status.enum';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
