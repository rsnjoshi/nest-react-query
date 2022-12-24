import { Task } from '@prisma/client';

export interface TaskList {
  notStarted: Task[];
  complete: Task[];
}
