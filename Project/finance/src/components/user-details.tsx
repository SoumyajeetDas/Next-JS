import React from 'react';
import useServerDarkMode from '@/hooks/useServerDarkMode';
import { createClient } from '@/lib/supbase/server';
import DarkModeToggle from '@/components/dark-mode-toggle';
import { KeyRound } from 'lucide-react';
import Link from 'next/link';
import { sizes, variants } from '@/lib/variants';
import SignOutButton from '@/components/sign-out-button';
import Avatar from '@/components/avatar';

const UserDetails = async () => {
  const theme = useServerDarkMode();

  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="flex items-center space-x-4">
      <DarkModeToggle defaultMode={theme} />
      {user && (
        <Link
          href="/dashboard/settings"
          className={`flex items-center space-x-1 ${variants['ghost']} ${sizes['sm']}`}
        >
          <Avatar />
          <span>{user?.email}</span>
        </Link>
      )}
      {user && <SignOutButton />}
      {!user && (
        <Link href="/login" className={`${variants['ghost']} ${sizes['sm']}`}>
          <KeyRound className="w-6 h-6" />
        </Link>
      )}
    </div>
  );
};

export default UserDetails;
