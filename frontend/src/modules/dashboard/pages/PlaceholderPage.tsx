import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@shared/components/ui/button';

export default function PlaceholderPage() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-bold">Estamos construyendo el sitio</h1>
      <Button variant="gold" asChild>
        <Link to="/dashboard">
          <ArrowLeft className="mr-2 size-4" />
          Volver atrás
        </Link>
      </Button>
    </div>
  );
}
