export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: Priority;
  status: TaskStatus;
  assignees: string[];
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'InProgress',
  Done = 'Done',
}
