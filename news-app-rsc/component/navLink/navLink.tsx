import Link from "next/link";
import React from "react";
import styles from "./navLink.module.css";
import Links from "./links/links";

const NavLink = () => {
  return (
    <header className={styles.header}>
      <h1>Newspaper</h1>
      <div className={styles.links}>
        {/* <Links href="/">Home</Links> */}
        <Links href="/news">News</Links>
        <Links href="/archive">Archive</Links>
      </div>
    </header>
  );
};

export default NavLink;
