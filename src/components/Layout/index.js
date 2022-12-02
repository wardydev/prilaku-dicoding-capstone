import React from "react";
import ListMenu from "../ListMenu";
import Logo from "../Logo";
import styles from "./Layout.module.scss";
import { routes } from "../../routes";
import { useRouter } from "next/router";
import { auth } from "../../config/firebase";
import { deleteCookie } from "cookies-next";

const Layout = ({ children }) => {
  const router = useRouter();

  const handleSignout = () => {
    auth.signOut();

    deleteCookie("USER_TOKEN");
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("DATAUSERS");

    router.push("/");
  };

  const handleRouteClick = (path) => {
    router.push(path);
  };
  
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
