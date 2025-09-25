import { User, UserRegisterRequest, UserRegisterResponse } from '@/types/user';
import { api } from './api';

export const registerUser = async (data: UserRegisterRequest): Promise<UserRegisterResponse> => {
  const response = await api.post<UserRegisterResponse>('/users/register', data);
  return response.data;
};

export const getUserByEmail = async (): Promise<User> => {
  const response = await api.get<User>(`/users/by-email`);
  return response.data;
};