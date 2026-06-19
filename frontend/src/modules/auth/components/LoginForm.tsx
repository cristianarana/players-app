"use client"

import { cn } from "@shared/lib/utils"
import { Button } from "@shared/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@shared/components/ui/field"
import { Input } from "@shared/components/ui/input"
import { GalleryVerticalEndIcon } from "lucide-react"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const{
    login,
    loading,
    error,
  } = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await login({
      username,
      password,
      });
    if (response){
      navigate('/dashboard');
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEndIcon className="size-6 text-white" />
              </div>
              <span className="sr-only">Fantasy Team.</span>
            </a>
            <h1 className="text-xl font-bold text-white">Welcome to Fantasy Team Management.</h1>
            <FieldDescription className="text-white/80">
              Don&apos;t have an account? <a href="#">Sign up</a>
            </FieldDescription>
          </div>
          <Field>
          <FieldLabel htmlFor="username" className="text-white">Username</FieldLabel>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          </Field>
          <Field>
            <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              required
            />
          </Field>
          <Field>
            {
              error && (
              <FieldDescription
                className="text-red-500"
                >
                {error}
              </FieldDescription>
              )
            }
            <Button
              variant="gold"
              type="submit"
              disabled={loading}
              className="w-full"
            >{
              loading ? 'Logging in...' : 'Login'
            }</Button>
          </Field>
          <FieldSeparator className="[&_[data-slot=field-separator-content]]:bg-transparent [&_[data-slot=field-separator-content]]:text-white/80">Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-2">
            {/* TODO: OAuth Google on backend.*/}
            {/*
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
              */}
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center text-white/60">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
