import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@shared/components/ui/button';
import { cn } from '@shared/lib/utils';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/teams', label: 'Teams' },
  { to: '/players', label: 'Players' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold">
          PlayersApp
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-foreground',
                  isActive ? 'text-foreground' : 'text-muted-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </Button>
              <Button className="w-full justify-start mt-1" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>Log In</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
