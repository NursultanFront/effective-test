import { Priority, TaskStatus } from './tasks.enum';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: Priority;
  status: TaskStatus;
  assignees: string[];
}
