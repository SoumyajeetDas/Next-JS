import Layout from '@/layout/layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Layout will contain the header so wrapped the compone t in __next_app__.tsx file so that it gets included in all the components
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
