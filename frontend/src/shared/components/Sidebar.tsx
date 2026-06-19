import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Shield, Users, ClipboardList, UserCog, Trophy, Calendar } from 'lucide-react';
import { cn } from '@shared/lib/utils';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/team-information', label: 'Team Information', icon: Shield },
  { to: '/dashboard/players', label: 'Players', icon: Users },
  { to: '/dashboard/trainings', label: 'Trainings', icon: ClipboardList },
  { to: '/dashboard/technical-staff', label: 'Technical Staff', icon: UserCog },
  { to: '/dashboard/competition', label: 'Competition', icon: Trophy },
  { to: '/dashboard/matches', label: 'Matches', icon: Calendar },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isActiveLink = (to: string) => {
    if (to === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 flex size-10 items-center justify-center rounded-lg bg-navbar text-white shadow-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-svh w-64 flex-col bg-navbar transition-transform duration-300 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center px-6">
          <Link to="/dashboard" className="text-xl font-bold text-white" onClick={handleLinkClick}>
            PlayersApp
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive || isActiveLink(to)
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white',
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
