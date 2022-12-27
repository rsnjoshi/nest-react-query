import { Status } from './status.enum';

export class UpdateTodoDto {
  title?: string;
  fileLocation?: string;
  description?: string;
  status?: Status;
}
