import { useState } from 'react';
import { login as loginService } from '../services/auth.service';
import type {
  LoginRequest,
  LoginResponse,
} from '../types/auth.types';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    credentials: LoginRequest,
  ): Promise<LoginResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginService(
        credentials,
      );

      localStorage.setItem(
        'access_token',
        response.access_token,
      );

      return response;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al iniciar sesión',
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}