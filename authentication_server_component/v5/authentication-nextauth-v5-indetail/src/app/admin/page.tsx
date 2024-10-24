import { auth } from '@/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin',
};

export default async function Page() {
  // TODO: Redirect non-admin users
  const session = await auth();
  if (!session?.user) {
    redirect('api/auth/signin?callbackUrl=/admin');
  } else {
    const role = session?.user?.role;

    if (!role || role !== 'admin') {
      throw new Error('Unauthorized');
    }
  }

  return (
    <main className="mx-auto my-10 space-y-3">
      <h1 className="text-center text-xl font-bold">Admin Page</h1>
      <p className="text-center">Welcome, admin!</p>
    </main>
  );
}
