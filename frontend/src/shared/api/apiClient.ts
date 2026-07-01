import axios, { type AxiosError } from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface ErrorResponse {
  message?: string | string[];
}

const getMessage = (error: AxiosError<ErrorResponse>): string => {
  const message = error.response?.data?.message;
  if (message) {
    return Array.isArray(message) ? message.join(', ') : message;
  }
  return 'An unexpected error occurred';
};

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const status = error.response.status;

    if (status === 401 && !error.config?.url?.includes('/api/auth/me')) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (status === 409) {
      toast.error(getMessage(error));
    } else if (status >= 400 && status < 500) {
      toast.error(getMessage(error));
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  },
);