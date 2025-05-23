import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import Logout from '../component/Logout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect('/');

  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">
        Welcome, {session?.user?.name} to Server Component. You are an{' '}
        {session?.user?.role}
      </h1>

      {session.user.name && session.user.image && (
        <Image
          src={session?.user?.image as string}
          alt={session?.user?.name as string}
          width={72}
          height={72}
          className="rounded-full"
        />
      )}

      <Logout />
    </div>
  );
};

export default HomePage;
