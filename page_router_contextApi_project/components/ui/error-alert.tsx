import React, { PropsWithChildren } from 'react';
import classes from './error-alert.module.css';

const ErrorAlert: React.FC<PropsWithChildren> = (props) => {
  return <div className={classes.alert}>{props.children}</div>;
};

export default ErrorAlert;
