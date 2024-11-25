import React, { PropsWithChildren } from 'react';
import Alert from '@/components/alert';
import { Ban } from 'lucide-react';

const AlertError: React.FC<Readonly<PropsWithChildren>> = ({ children }) => {
  return (
    <Alert
      icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />}
      title={<span className="text-red-700 dark:text-red-300">Error</span>}
    >
      <span className="text-red-700 dark:text-red-300">{children}</span>
    </Alert>
  );
};

export default AlertError;
