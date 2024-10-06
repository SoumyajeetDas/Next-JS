import React, { ReactNode } from 'react';
import classes from './logistics-item.module.css';

const LogisticsItem: React.FC<{ icon: any; children: ReactNode }> = (props) => {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
};

export default LogisticsItem;
