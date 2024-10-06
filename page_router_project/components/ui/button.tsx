import Link from 'next/link';
import React from 'react';
import classes from './button.module.css';

const Button: React.FC<{
  onClick?: () => void;
  link?: string;
  children: React.ReactNode;
}> = (props) => {
  if (props.link) {
    return (
      <Link className={classes.btn} href={props.link}>
        {props.children}
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={classes.btn}>
      {props.children}
    </button>
  );
};

export default Button;
