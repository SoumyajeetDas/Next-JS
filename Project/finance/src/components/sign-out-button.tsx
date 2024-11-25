'use client';

import React from 'react';
import { signOut } from '@/lib/action';
import SubmitButton from '@/components/submit-button';
import { LogOut } from 'lucide-react';

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
};

export default SignOutButton;
