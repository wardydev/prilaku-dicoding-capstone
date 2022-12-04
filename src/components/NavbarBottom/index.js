import React from "react";
import Navigation from "../Navigation";
import styles from "./NavbarBottom.module.scss"

const NavbarBottom = () => {
  return (
    <div className={styles['navbar-bottom']}>
      <div className={styles['navbar-bottom__inner']}>
        <Navigation styles={styles} />
      </div>
    </div>
  );
}

export default NavbarBottom;

