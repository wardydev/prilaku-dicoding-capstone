import React from "react";
import styles from "./Layout.module.scss";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
