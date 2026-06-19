import { Link } from 'react-router-dom';
import { Shield, Users, ClipboardList, UserCog, Trophy, Calendar } from 'lucide-react';
import teamLogo from '../assets/team_logo.png';

const sections = [
  { name: 'Team Information', slug: 'team-information', icon: Shield },
  { name: 'Players', slug: 'players', icon: Users },
  { name: 'Trainings', slug: 'trainings', icon: ClipboardList },
  { name: 'Technical Staff', slug: 'technical-staff', icon: UserCog },
  { name: 'Competition', slug: 'competition', icon: Trophy },
  { name: 'Matches', slug: 'matches', icon: Calendar },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-12 flex items-center justify-center gap-4">
        <img
          src={teamLogo}
          alt="Club shield"
          className="size-16 object-contain"
        />
        <h1 className="text-3xl font-bold">Fantasy Team</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ name, slug, icon: Icon }) => (
          <Link
            key={slug}
            to={`/dashboard/${slug}`}
            className="flex flex-col items-center gap-4 rounded-xl border border-border bg-background p-8 transition-shadow hover:shadow-lg"
          >
            <div className="flex size-14 items-center justify-center rounded-xl bg-navbar/10 text-navbar">
              <Icon className="size-7" />
            </div>
            <span className="text-lg font-semibold">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
