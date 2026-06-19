import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import MainLayout from
'@shared/layouts/MainLayout';

import LandingPage from
'@modules/landing_page/pages/LandingPage';

import LoginPage from
'@modules/auth/pages/LoginPage';

export default function AppRouter() {

  return (

    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            index
            element={<LandingPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          {/*
            TODO: Create SignUpPage component
            <Route
              path="/signup"
              element={<SignUpPage />}
            />
          */}
        </Route>
      </Routes>
    </BrowserRouter>

  );
}