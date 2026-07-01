"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@shared/components/ui/button';
import { Field, FieldError, FieldGroup } from '@shared/components/ui/field';
import { Input } from '@shared/components/ui/input';

export default function ContactForm() {
  const [name, setNombre] = useState('');
  const [mail, setMail] = useState('');
  const [description, setConsulta] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mail, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success('Message sent successfully!');
      setNombre('');
      setMail('');
      setConsulta('');
    } catch {
      setError('Could not send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg">
      <FieldGroup>
        <Field>
          <Input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-features"
            required
          />
        </Field>
        <Field>
          <Input
            id="mail"
            type="email"
            placeholder="Mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="bg-features"
            required
          />
        </Field>
        <Field>
          <textarea
            id="description"
            placeholder="Write your message here..."
            value={description}
            onChange={(e) => setConsulta(e.target.value)}
            className="bg-features flex min-h-[80px] w-full rounded-lg border border-input px-2.5 py-1.5 text-base transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            required
          />
        </Field>
        {error && <FieldError>{error}</FieldError>}
        <Button type="submit" variant="gold" className="mt-2 w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Enviar'}
        </Button>
      </FieldGroup>
    </form>
  );
}
