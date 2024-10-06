import React from 'react';
import '../globals.css';
import { logout } from '@/lib/action';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

// This layout.tsx will not replace the layout.tsx in the root of the app. So ideally this header should be kept in the root layout.tsx
// Rference : https://cognizant.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/43341220#overview
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header id="auth-header">
          Welcome back !!
          <form action={logout}>
            <button type="submit">Logout</button>
          </form>
        </header>
        {children}
      </body>
    </html>
  );
}
