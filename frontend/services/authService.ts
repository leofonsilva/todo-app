import { api } from './api';
import { AuthLoginRequest, AuthLoginResponse } from '@/types/auth';

export const login = async (data: AuthLoginRequest): Promise<AuthLoginResponse> => {
  const response = await api.post<AuthLoginResponse>('/auth/login', data);
  return response.data;
};