import { api } from '../../../shared/api/apiClient';
import { LoginRequest, LoginResponse } from '../types/auth.types';

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {

  const response = await api.post<LoginResponse>(
    '/auth/login',
    credentials,
  );

  return response.data;
};