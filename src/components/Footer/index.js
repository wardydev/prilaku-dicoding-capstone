import React from "react";
import Image from "next/image";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__inner"]}>
        <div className={styles["footer-content"]}>
          <div className={styles["footer-content__logo"]}>
            <Image
              src="/images/logo2.svg"
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
                <a href="https://www.facebook.com/dicoding/" target="blank">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/dicoding" target="blank">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/dicoding" target="blank">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
              <li>
                <a href="https://github.com/wardydev/prilaku-dicoding-capstone" target="blank">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["footer-content"]}>
          <div className={styles["row"]}>
            <div className="col-12 col-md-6 mb-5">
              <h3>Our Address</h3>
              <ul className={styles["list-content"]}>
                <li>Bali</li>
                <li>Kalimantan Timur</li>
                <li>Nusa Tenggara Barat</li>
              </ul>
            </div>
            <div className="col-12 col-md-6">
              <h3>Information</h3>
              <ul className={styles["list-content"]}>
                <li>About Us</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["footer-copyright"]}>
        <p>© 2022 Prilaku - Captstone Project Team C22 - 077</p>
      </div>
    </footer>
  )
}

export default Footer;
