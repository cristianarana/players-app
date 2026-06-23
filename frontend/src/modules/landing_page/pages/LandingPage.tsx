import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@shared/components/ui/button';
import { useAuth } from '@shared/contexts/AuthContext';
import WaveDivider from '../components/WaveDivider';
import ContactForm from '../components/ContactForm';
import fondoLanding from '../../../assets/img/fondo_landing.png';

export default function LandingPage() {
  const { hash } = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="relative">
      {!isAuthenticated && (
        <img
          src={fondoLanding}
          alt=""
          className="pointer-events-none fixed inset-0 h-full w-full object-cover"
        />
      )}

      <div className="relative z-10 flex flex-col">
        <section id="home" className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Manage your teams, players, and tournaments
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            The all-in-one platform for sports management. Organize matches, track
            performance, and keep everyone connected.
          </p>
        </section>

        <WaveDivider fill="#E0F4FA" />

        <section id="features" className="bg-features px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl font-bold">Features</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl font-bold text-white">Contact Us</h2>
            <p className="mt-4 text-lg text-white/80">
              Have questions? Get in touch with our team.
            </p>
            <ContactForm />
          </div>
        </section>

        <footer className="px-4 py-8 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} PlayersApp. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Team Management',
    description:
      'Create and manage teams with ease. Add players, assign roles, and keep track of your roster.',
    icon: '👥',
  },
  {
    title: 'Match Scheduling',
    description:
      'Schedule matches, set locations, and notify participants automatically.',
    icon: '📅',
  },
  {
    title: 'Performance Analytics',
    description:
      'Track player statistics, generate reports, and make data-driven decisions.',
    icon: '📊',
  },
  {
    title: 'Tournament Brackets',
    description:
      'Organize tournaments with automatic bracket generation and real-time updates.',
    icon: '🏆',
  },
  {
    title: 'Training Plans',
    description:
      'Design training sessions, assign drills, and monitor player progress.',
    icon: '🎯',
  },
  {
    title: 'Communication Hub',
    description:
      'Keep everyone in the loop with built-in messaging and announcements.',
    icon: '💬',
  },
];
