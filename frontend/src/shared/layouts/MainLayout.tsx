import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@shared/components/Navbar';
import Sidebar from '@shared/components/Sidebar';
import { useAuth } from '@shared/contexts/AuthContext';
import { Button } from '@shared/components/ui/button';
import { LogOut } from 'lucide-react';

export default function MainLayout() {
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();

  const showSidebar = isAuthenticated && pathname !== '/dashboard';

  return (
    <>
      {!isAuthenticated && <Navbar />}

      {showSidebar && <Sidebar />}

      <main
        className={`min-h-svh ${!isAuthenticated ? 'pt-16' : ''} ${showSidebar ? 'md:ml-64' : ''} ${isAuthenticated ? 'bg-app-bg' : ''}`}
      >
        <Outlet />
      </main>

      {isAuthenticated && (
        <Button
          variant="gold"
          className="fixed bottom-6 right-6 z-50 shadow-lg"
          onClick={logout}
        >
          <LogOut className="mr-2 size-4" />
          Log Out
        </Button>
      )}
    </>
  );
}
