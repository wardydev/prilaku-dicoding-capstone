import React from "react";
import { getUserInfo } from "../../utils/functions";
import styles from "./NavbarTop.module.scss";

const NavbarTop = ({ children }) => {
  return (
    <div className={styles['navbar-top']}>
      <div className={styles['navbar-top__inner']}>
        { children }
      </div>
    </div>
  )
}

export default NavbarTop;
