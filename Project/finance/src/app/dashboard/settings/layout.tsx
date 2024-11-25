import React, { PropsWithChildren } from 'react';
import SideNav from '@/app/dashboard/settings/components/side-nav';

const Layout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      <aside>
        <SideNav />
      </aside>
      <div className="col-span-3">{children}</div>
    </div>
  );
};

export default Layout;
