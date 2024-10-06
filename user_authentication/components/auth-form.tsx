'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { auth } from '@/lib/action';

export type AuthFormErrorStateType = {
  message: {
    email: string;
    password: string;
  };
};

const AuthForm: React.FC<{ mode: 'login' | 'signup' }> = ({ mode }) => {
  const initialState: AuthFormErrorStateType = {
    message: {
      email: '',
      password: '',
    },
  };

  const [state, formAction] = useFormState(auth.bind(null, mode), initialState);

  // useFormStatus hook can be used without useFormState
  const { pending } = useFormStatus();

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <b style={{ color: 'red' }}>{state?.message.email}</b>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <b style={{ color: 'red' }}>{state?.message.password}</b>
      </p>
      <p>
        <button type="submit" disabled={pending}>
          Create Account
        </button>
      </p>
      <p>
        {mode === 'signup' && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
        {mode === 'login' && (
          <Link href="/?mode=signup">
            Don&apos;t have an account. Create an account
          </Link>
        )}
      </p>
    </form>
  );
};

export default AuthForm;
