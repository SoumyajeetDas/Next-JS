// This module is a client componen as it uses the usePathname() hook from next/navigation.

'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import styles from '../header.module.css';

type NavLinkType = {
  href: string;
  children: React.ReactNode;
};
const NavLink: React.FC<NavLinkType> = ({ href, children }) => {
  const isActive = usePathname();
  return (
    <Link
      className={`${styles.menus} ${isActive.startsWith(href) ? styles.menus_active : ''}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
