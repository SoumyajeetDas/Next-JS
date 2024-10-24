import { Metadata } from 'next';
import SettingsPage from './SettingsPage';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Page() {
  // TODO: Protect this page via authentication
  const session = await auth();

  if (!session?.user) {
    // Use this only if you have the custom signin page.
    // redirect('/signin');

    // Use this only if you have the nextauth default signin page.
    redirect('api/auth/signin?callbackUrl=/settings');
  }

  return <SettingsPage user={session.user} />;
}
