import React from "react";
import HomeHeader from "../../src/components/HomeHeader";
import styles from "./about.module.scss";
import Image from "next/image";

const index = () => {
  return (
    <div className="landing">
      <HomeHeader />
      <div className={styles.header}>
        <div>
          <h1 className={styles.center}>What is Prilaku</h1>
          <p>
            <strong>Prilaku</strong> is a website application that makes it easy
            to build habits, make schedules more organized, and can increase
            productivity. With a modern interface, great user experience, and
            lots of supporting features.
          </p>
          <p>
            Many community activities are hampered and tend to have limitations
            due to the COVID-19 pandemic. We have to start adapting to new
            habits and managing activities to increase productivity.
          </p>
        </div>
        <div>
          <Image
            src="/images/about.jpg"
            alt="meeting photo"
            width="600px"
            height="375px"
          ></Image>
        </div>
      </div>

      <section className={styles.team}>
        <h2>Meet the team</h2>
        <h3>The creative people behind Prilaku</h3>
        <div className={styles.teamList}>
          <div className={styles.teamItem}>
            <Image
              src="/images/ari.jpg"
              alt="Ari photo"
              width="320px"
              height="320px"
            ></Image>
            <h4>
              <a
                className={styles.link}
                href="https://www.linkedin.com/in/arialghifari/"
                style={{ color: "#3c4043", textDecoration: "none" }}
              >
                Ari Alghifari
              </a>
            </h4>
            <p>Front-End</p>
          </div>
          <div className={styles.teamItem}>
            <Image
              src="/images/haerul.jpg"
              alt="Haerul photo"
              width="320px"
              height="320px"
            ></Image>
            <h4>
              <a
                className={styles.link}
                href="https://www.linkedin.com/in/hairul-wardi-166574231/"
                style={{ color: "#3c4043", textDecoration: "none" }}
              >
                Haerul Wardi
              </a>
            </h4>
            <p>Front-End</p>
          </div>
          <div className={styles.teamItem}>
            <Image
              src="/images/sukron.jpg"
              alt="Sukron photo"
              width="320px"
              height="320px"
            ></Image>
            <h4>
              <a
                className={styles.link}
                href="https://www.linkedin.com/in/sukronsabari/"
                style={{ color: "#3c4043", textDecoration: "none" }}
              >
                Sukron Sabari
              </a>
            </h4>
            <p>Front-End</p>
          </div>
          <div className={styles.teamItem}>
            <Image
              src="/images/yasa.jpeg"
              alt="Yasa photo"
              width="320px"
              height="320px"
            ></Image>
            <h4>
              <a
                className={styles.link}
                href="https://www.linkedin.com/in/kusumayasa/"
                style={{ color: "#3c4043", textDecoration: "none" }}
              >
                Kusuma Yasa
              </a>
            </h4>
            <p>Front-End</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
