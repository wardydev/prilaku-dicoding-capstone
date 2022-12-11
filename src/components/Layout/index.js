import React from "react";

import styles from "./Layout.module.scss";

import NavbarLeftBottom from "../NavbarLeftBottom";
import NavbarTop from "../NavbarTop";

import Logo from "../Logo";
import Footer from "../Footer";
import UserLoginProfile from "../UserLoginProfile";
import Link from "next/link";

const Layout = ({ children, navbarTopContent }) => {
  return (
    <section className={styles["section-page"]}>
      <NavbarLeftBottom />
      <NavbarTop>
        <div className={styles["logo"]}>
          <Link href="/">
            <a className="d-flex align-items-center gap-2" style={{ textDecoration: "none", color: "#3c4043" }}>
              <Logo width="35" />
              <span>Prilaku</span>
            </a>
          </Link>
        </div>
        {navbarTopContent}
      </NavbarTop>
      <main>{children}</main>
      <Footer />
    </section>
  );
};

export default Layout;
