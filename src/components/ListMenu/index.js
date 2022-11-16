import React from "react";
import Link from "next/link";

import styles from "./ListMenu.module.scss";

const ListMenu = ({ iconName, menu, isActive = false, path }) => {
  return (
    <div className={styles.menus}>
      <div className={isActive ? styles.menuActive : styles.menu}>
        <ion-icon name={iconName}></ion-icon>
        <Link href={`/${path}`}>
          <a>{menu}</a>
        </Link>
      </div>
    </div>
  );
};

export default ListMenu;
