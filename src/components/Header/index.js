import React from "react";
import Image from "next/image";

import styles from "./Header.module.scss";

const Header = ({ title, children }) => {
  return (
    <div className={styles['header-bar']}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Header;
