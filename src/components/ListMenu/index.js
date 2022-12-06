import React from "react";
import Link from "next/link";

import styles from "./ListMenu.module.scss";

const ListMenu = ({
  iconName,
  menu,
  isActive = false,
  path,
  isPath = false,
  isResponsive,
}) => {
  return (
    <div className={styles.menus}>
      <div className={isActive ? styles.menuActive : styles.menu}>
        <ion-icon name={iconName}></ion-icon>
        {isPath ? (
          <span>{menu}</span>
        ) : (
          <Link href={`/${path}`}>
            <a style={{ textDecoration: "none" }}>{menu}</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListMenu;
