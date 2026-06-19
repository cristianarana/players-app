import { Routes, Route } from 'react-router-dom';

import MainLayout from '@shared/layouts/MainLayout';
import ProtectedRoute from '@shared/components/ProtectedRoute';
import PublicRoute from '@shared/components/PublicRoute';

import LandingPage from '@modules/landing_page/pages/LandingPage';

import LoginPage from '@modules/auth/pages/LoginPage';

import DashboardPage from '@modules/dashboard/pages/DashboardPage';

import PlaceholderPage from '@modules/dashboard/pages/PlaceholderPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoute />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:section" element={<PlaceholderPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
