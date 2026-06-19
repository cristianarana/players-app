import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@shared/components/ui/button';
import { useAuth } from '@shared/contexts/AuthContext';
import { cn } from '@shared/lib/utils';

const publicLinks = [
  { to: '/#home', label: 'Home' },
  { to: '/#features', label: 'Features' },
  { to: '/#contact', label: 'Contact Us' },
];

const authLinks = [
  { to: '/', label: 'Home' },
  { to: '/teams', label: 'Teams' },
  { to: '/players', label: 'Players' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const links = isAuthenticated ? authLinks : publicLinks;

  const handleNavClick = (to: string) => {
    setIsOpen(false);
    if (!isAuthenticated) {
      navigate(to);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-navbar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold text-white">
          PlayersApp
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/' || link.to === '/#home'}
              onClick={() => handleNavClick(link.to)}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors',
                  isActive ? 'text-white' : 'text-white/60 hover:text-white',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {isAuthenticated ? (
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <Button variant="gold" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/' || link.to === '/#home'}
                onClick={() => handleNavClick(link.to)}
                className={({ isActive }) =>
                  cn(
                    'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:bg-white/10 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-white/10 pt-2 mt-2">
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-white hover:bg-white/10"
                  onClick={() => { logout(); setIsOpen(false); }}
                >
                  Log Out
                </Button>
              ) : (
                <>
                  <Button variant="gold" className="w-full justify-start" asChild>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                  </Button>
                  <Button variant="gold" className="w-full justify-start mt-1" asChild>
                    <Link to="/login" onClick={() => setIsOpen(false)}>Log In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
