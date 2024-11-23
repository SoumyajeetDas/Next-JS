import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { sizes, variants } from '@/lib/variants';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <div className="absolute left-8 top-8">
        <Link
          href="/dashboard"
          className={`${variants['ghost']} ${sizes['base']} flex items-center space-x-2 text-sm`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </main>
  );
};

export default Layout;
