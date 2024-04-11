import { Priority, TaskStatus } from './tasks.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  priority: Priority;
  status: TaskStatus;
  assignees: string;
}

export type TaskStatusValue = `${TaskStatus}`;

export type TaskFilter = {
  status: TaskStatusValue;
  assignee: string;
  date: Date | null;
};
