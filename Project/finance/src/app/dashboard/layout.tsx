import PageHeader from '@/components/page-header';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader className="mt-8" />
      <main>{children}</main>
      <footer className="mt-auto text-center py-8">Footer</footer>
    </>
  );
}
