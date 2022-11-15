import React, { useState } from "react";
import ListMenu from "../ListMenu";
import Logo from "../Logo";
import styles from "./Layout.module.scss";
import { routes } from "../../routes";

const Layout = ({ children }) => {
  const [listMenuActive, setListMenuActive] = useState(1);
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.menusContainer}>
          <div className={styles.menuContainer}>
            {routes.map((route) => {
              return (
                <div key={route.id} onClick={() => setListMenuActive(route.id)}>
                  <ListMenu
                    menu={route.routeName}
                    iconName={route.iconName}
                    path={route.path}
                    isActive={route.id === listMenuActive ? true : false}
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.logout}>
            <ListMenu iconName="log-out-outline" menu="Checkout" />
          </div>
        </div>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
