import React from "react";
import Head from "next/head";

import styles from "./Layout.module.scss";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        ></script>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Prilaku — Managing habits made easy</title>
      </Head>
      <Sidebar />
      <Navbar />
      <div className={styles.childrenContainer}>{children}</div>
    </>
  );
};

export default Layout;
