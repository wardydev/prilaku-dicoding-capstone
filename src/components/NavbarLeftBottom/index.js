import React from "react";
import Navigation from "../Navigation";
import styles from "./NavbarLeftBottom.module.scss"

const NavbarLeftBottom = () => {
  return (
    <div className={styles['navbar-bottom']}>
      <div className={styles['navbar-bottom__inner']}>
        <Navigation styles={styles} />
      </div>
    </div>
  );
}

export default NavbarLeftBottom;
