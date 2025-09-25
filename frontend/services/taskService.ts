import { api } from './api';
import { CreateTaskRequest, Task, UpdateTaskRequest } from '@/types/task';

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (data: CreateTaskRequest): Promise<Task> => {
  const response = await api.post<Task>('/tasks', data);
  return response.data;
};

export const updateTask = async ({ id, data }: { id: string; data: UpdateTaskRequest }): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};