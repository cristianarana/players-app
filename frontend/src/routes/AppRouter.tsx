import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from
'@modules/auth/pages/LoginPage';

export default function AppRouter() {

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
    </BrowserRouter>

  );
}