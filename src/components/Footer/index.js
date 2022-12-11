import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__inner"]}>
        <div className={styles["footer-content"]}>
          <div className={styles["footer-content__logo"]}>
            <Image
              src="/images/logo.png"
              width={48}
              height={48}
              alt="image profile"
              className={styles.image}
            />
            <span>Prilaku</span>
          </div>
          <div className={styles["footer-content__caption"]}>
            <p>Plan, Manage and Build your habits for the better</p>
          </div>
          <div className={styles["footer-content__social-links"]}>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/dicoding/"
                  target="__blank"
                  style={{ color: "#3c4043" }}
                >
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/dicoding"
                  target="__blank"
                  style={{ color: "#3c4043" }}
                >
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/dicoding"
                  target="__blank"
                  style={{ color: "#3c4043" }}
                >
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/wardydev/prilaku-dicoding-capstone"
                  target="__blank"
                  style={{ color: "#3c4043" }}
                >
                  <ion-icon name="logo-github"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["footer-content"]}>
          <div className={styles["row"]}>
            <div className="col-12">
              <h3>Information</h3>
              <ul className={styles["list-content"]}>
                <li>
                  <Link href="/about">
                    <a style={{ textDecoration: "none", color: "#3c4043" }}>
                      About Us
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a style={{ textDecoration: "none", color: "#3c4043" }}>
                      Blog
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["footer-copyright"]}>
        <p>© 2022 Prilaku - Captstone Project Team C22 - 077</p>
      </div>
    </footer>
  );
};

export default Footer;
