import React from "react";

import styles from "./Layout.module.scss";

import NavbarLeftBottom from "../NavbarLeftBottom";
import NavbarTop from "../NavbarTop";

import Logo from "../Logo";
import Footer from "../Footer";
import UserLoginProfile from "../UserLoginProfile";

const Layout = ({ children, navbarTopContent }) => {
  return (
    <section className={styles["section-page"]}>
      <NavbarLeftBottom />
      <NavbarTop>
        <div className={styles["logo"]}>
          <Logo />
          <span>Prilaku</span>
        </div>
        {
          navbarTopContent
        }
      </NavbarTop>
      <main>
        {children}
      </main>
      <Footer />
    </section>
  );
};

export default Layout;
