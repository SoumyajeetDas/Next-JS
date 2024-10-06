// Global Loading
// WIll render whenever any page even if it is nested gets loaded.
import React from 'react';
import styles from './loading.module.css';

const Loading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p className={styles.loading}>
      {children === undefined ? 'Featching Page...' : children}
    </p>
  );
};

export default Loading;
