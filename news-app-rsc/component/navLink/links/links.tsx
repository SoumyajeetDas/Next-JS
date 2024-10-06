"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "../navLink.module.css";

type LinkType = {
  href: string;
  children: React.ReactNode;
};
const Links: React.FC<LinkType> = ({ href, children }) => {
  const isActive = usePathname();

  return (
    <Link
      className={`${isActive.startsWith(href) ? `${styles.active}` : ""}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default Links;
