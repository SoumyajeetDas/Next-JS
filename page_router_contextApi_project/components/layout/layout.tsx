import { Fragment, ReactNode, useContext } from 'react';
import MainNavigation from './main-navigation';
import Notification from '../ui/notification';
import { NotificationContext } from '@/store/notification-content';

const Layout: React.FC<{ children: ReactNode }> = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx!.notification;

  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
