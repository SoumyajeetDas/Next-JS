import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';

export const NotificationContext = createContext<
  | {
      notification: { title: string; message: string; status: string } | null;
      showNotification: (
        notificationData: {
          title: string;
          message: string;
          status: string;
        } | null,
      ) => void;
      hideNotification: () => void;
    }
  | undefined
>(undefined);

const NotificationContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [activeNotification, setActiveNotification] = useState<{
    title: string;
    message: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(
    notificationData: {
      title: string;
      message: string;
      status: string;
    } | null,
  ) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
