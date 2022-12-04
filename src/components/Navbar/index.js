import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

import { routes } from "../../routes";
import Logo from "../Logo";
import styles from "./Navbar.module.scss";
import { auth } from "../../config/firebase";

const Navbar = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [isUserSignOut, setIsUserSignOut] = useState(false);
  const router = useRouter();

  const handleRouteClick = (path) => {
    router.push(path);
  };

  const handleSignout = () => {
    auth.signOut().then(() => {
      setIsUserSignOut(true);
      deleteCookie("USER_TOKEN");
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("DATAUSERS");
    });
  };

  useEffect(() => {
    if (isUserSignOut) {
      window.localStorage.removeItem("TOKEN");
      window.localStorage.removeItem("DATAUSERS");
      router.push("/login");
    }
  }, [isUserSignOut]);

  return (
    <div className={styles.navbar}>
      <div className="d-flex justify-content-between align-items-center px-3 py-3 bg-black border-bottom">
        <Logo width={45} />
        <div onClick={() => setIsNavbarActive(!isNavbarActive)}>
          {isNavbarActive ? (
            <ion-icon name="close-outline" style={{ fontSize: 36 }}></ion-icon>
          ) : (
            <ion-icon name="menu" style={{ fontSize: 36 }}></ion-icon>
          )}
        </div>
      </div>
      {isNavbarActive && (
        <div className={styles.menusContainer}>
          {routes.map((route) => {
            return (
              <div
                key={route.id}
                onClick={() => handleRouteClick(route.path)}
                className="my-2 w-100 d-flex text-center"
              >
                <Link href={`/${route.path}`}>
                  <a
                    className={
                      router.pathname === "/" + route.path
                        ? styles.menuActive
                        : styles.menu
                    }
                  >
                    {route.routeName}
                  </a>
                </Link>
              </div>
            );
          })}
          <div
            className={`mt-3 w-100 py-3 text-center d-flex align-items-center justify-content-center ${styles.menu}`}
            onClick={handleSignout}
          >
            <ion-icon
              name="log-out-outline"
              style={{ fontSize: 26, marginRight: 8 }}
            ></ion-icon>
            <Link href={`/`}>
              <a>Logout</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
