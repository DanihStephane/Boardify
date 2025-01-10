export type Status = 'todo' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee?: string;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  estimatedHours?: number;
  completedAt?: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}