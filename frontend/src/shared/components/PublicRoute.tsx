import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@shared/contexts/AuthContext';

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
