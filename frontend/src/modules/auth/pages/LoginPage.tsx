import { LoginForm } from '../components/LoginForm';
import fondoLanding from '../../../assets/img/fondo_landing.png';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <img
        src={fondoLanding}
        alt=""
        className="pointer-events-none fixed inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}