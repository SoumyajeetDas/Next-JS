import Layout from '@/components/layout/layout';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    // If you pass the session page prop to the <SessionProvider> – as in the example above – you can avoid checking the session
    // twice on pages that support both server and client side rendering (SSR).
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
