import React from "react";
import HomeHeader from "../../src/components/HomeHeader";
import styles from "./about.module.scss";

const index = () => {
  return (
    <div className="landing">
      <HomeHeader />

      <div className={styles.header}>
        <div>
          <h1 className={styles.center}>Who we are</h1>
          <p>Many community activities are hampered and tend to have limitations due to the COVID-19 pandemic. We have to start adapting to new habits and managing activities to increase productivity.</p>
          <p>Prilaku is a website application that makes it easy to build habits, make schedules more organized, and can increase productivity. With a modern interface, great user experience, and lots of supporting features.</p>
        </div>
        <div>
          <img src="/images/about.jpg"></img>
        </div>
      </div>

      <section className={styles.team}>
        <h2>Meet the team</h2>
        <h3>The creative people behind Prilaku</h3>
        <div className={styles.teamList}>
          <div className={styles.teamItem}>
            <img src="/images/ari.jpg" alt="Foto Ari"></img>
            <h4><a className={styles.link} href="https://www.linkedin.com/in/arialghifari/">Ari Alghifari</a></h4>
            <p>Front-End</p>
          </div>
          <div className={styles.teamItem}>
            <img src="/images/haerul.jpg" alt="Foto Haerul"></img>
            <h4><a className={styles.link} href="https://www.linkedin.com/in/hairul-wardi-166574231/">Haerul Wardi</a></h4>
            <p>Front-End</p>
          </div>
          <div className={styles.teamItem}>
            <img src="/images/sukron.jpg" alt="Foto Sukron"></img>
            <h4><a className={styles.link} href="https://www.linkedin.com/in/sukronsabari/">Sukron Sabari</a></h4>
            <p>Front-End</p>
          </div>
          <div className={styles.teamItem}>
            <img src="/images/yasa.jpeg" alt="Foto Yasa"></img>
            <h4><a className={styles.link} href="https://www.linkedin.com/in/kusumayasa/">Kusuma Yasa</a></h4>
            <p>Front-End</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
