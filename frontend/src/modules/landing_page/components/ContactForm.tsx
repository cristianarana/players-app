"use client"

import { useState } from 'react';
import { Button } from '@shared/components/ui/button';
import { Field, FieldGroup } from '@shared/components/ui/field';
import { Input } from '@shared/components/ui/input';

export default function ContactForm() {
  const [name, setNombre] = useState('');
  const [mail, setMail] = useState('');
  const [description, setConsulta] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, mail, description });
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
        <Button type="submit" variant="gold" className="mt-2 w-full">
          Enviar
        </Button>
      </FieldGroup>
    </form>
  );
}
