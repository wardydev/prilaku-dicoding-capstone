import React from "react";
import { deleteCookie } from "cookies-next";

import ListMenu from "../ListMenu";
import Logo from "../Logo";
import styles from "./Layout.module.scss";
import { routes } from "../../routes";
import { useRouter } from "next/router";
import { auth } from "../../config/firebase";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Sidebar />
      <Navbar />
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
