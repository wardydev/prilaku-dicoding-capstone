import React from "react";
import ListMenu from "../ListMenu";
import Logo from "../Logo";
import styles from "./Layout.module.scss";
import { routes } from "../../routes";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  const handleRouteClick = (path) => {
    router.push(path);
  };

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
                <div
                  key={route.id}
                  onClick={() => handleRouteClick(route.path)}
                >
                  <ListMenu
                    menu={route.routeName}
                    iconName={route.iconName}
                    path={route.path}
                    isActive={
                      router.pathname === "/" + route.path ? true : false
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className={styles.logout}>
            <ListMenu iconName="log-out-outline" menu="Logout" />
          </div>
        </div>
      </div>
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
