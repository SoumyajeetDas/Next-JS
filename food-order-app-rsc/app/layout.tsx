import type { Metadata } from 'next';
import Header from '@/component/header/header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next Level Food',
  description: 'Delicious Meals shared by a food loving community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
