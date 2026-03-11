import { Pagination } from "./shared";

export interface TaskFiltersRequest {
  search?: string;
  status?: 'pending' | 'in-progress' | 'done';
  isCompleted?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface GetAllTasksResponse {
  tasks: Task[];
  pagination: Pagination;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'done';
}