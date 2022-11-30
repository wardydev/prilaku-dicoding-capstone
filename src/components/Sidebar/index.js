import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import { routes } from "../../routes";
import ListMenu from "../ListMenu";
import Logo from "../Logo";
import { useRouter } from "next/router";
import { auth } from "../../config/firebase";

const Sidebar = () => {
  const router = useRouter();
  const [isUserSignOut, setIsUserSignOut] = useState(false);

  const handleSignout = () => {
    auth.signOut().then(() => {
      setIsUserSignOut(true);
    });
  };

  const handleRouteClick = (path) => {
    router.push(path);
  };

  useEffect(() => {
    if (isUserSignOut) {
      window.localStorage.removeItem("TOKEN");
      window.localStorage.removeItem("DATAUSERS");
      router.push("/login");
    }
  }, [isUserSignOut]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.menusContainer}>
        <div className={styles.menuContainer}>
          {routes.map((route) => {
            return (
              <div key={route.id} onClick={() => handleRouteClick(route.path)}>
                <ListMenu
                  menu={route.routeName}
                  iconName={route.iconName}
                  path={route.path}
                  isActive={router.pathname === "/" + route.path ? true : false}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.logout} onClick={handleSignout}>
          <ListMenu iconName="log-out-outline" menu="Logout" isPath={true} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
