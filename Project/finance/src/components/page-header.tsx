import React, { Suspense } from 'react';
import Link from 'next/link';
import UserDetails from '@/components/user-details';

const PageHeader: React.FC<{ className: string }> = async ({ className }) => {
  // This is although a custom hook but working in server side only

  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>

      <Suspense fallback={<div>Loading User Details...</div>}>
        <UserDetails />
      </Suspense>
    </header>
  );
};

export default PageHeader;
