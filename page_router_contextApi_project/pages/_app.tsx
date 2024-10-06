import Layout from '@/components/layout/layout';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import NotificationContextProvider from '@/store/notification-content';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
};

export default MyApp;
