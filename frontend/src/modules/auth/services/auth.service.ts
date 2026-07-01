import { api } from '../../../shared/api/apiClient';
import { LoginRequest, LoginResponse, User } from '../types/auth.types';

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {

  const response = await api.post<LoginResponse>(
    '/api/auth/login',
    credentials,
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/api/auth/logout');
};

export const getMe = async (): Promise<User | null> => {
  try {
    const response = await api.get<{ user: User }>('/api/auth/me');
    return response.data.user;
  } catch {
    return null;
  }
};