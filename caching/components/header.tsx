// import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import React from 'react';

const callMes = async (): Promise<number> => {
  // This will be cached with the help of Request Memoization, It will use the memo created by the fetch in layout.tsx under messages path.
  // And this will also be called during revalidateTag / revalidatePath in the layout.tsx under messages path.
  // const response = await fetch(
  //   'https://6652d3e3813d78e6d6d6538e.mockapi.io/api/products',
  // );

  const response = await fetch('http://localhost:8080/messages');

  const messages = await response.json();
  const totalMessages = messages.length;

  return totalMessages;
};

const Header: React.FC = async () => {
  // const refreshData = async (_: FormData) => {
  //   'use server';
  //   revalidatePath('/messages');
  // };

  const totalMessages = await callMes();
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextCaching</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/messages">Messages</Link>
          </li>
          <li>
            <Link href="/messages/new">New Message</Link>
          </li>
          {/* <li>
            <form action={refreshData}>
              <button>Purge Data</button>
            </form>
          </li> */}
          <li>{totalMessages}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
