import Link from "next/link";
import Logo from "../src/components/Logo";
import HomeHeader from "../src/components/HomeHeader";
import { getCookie } from "cookies-next";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const USER_TOKEN = getCookie("USER_TOKEN");

    if (!USER_TOKEN) {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("DATAUSERS");
    }
  }, []);

  return (
    <div className="landing">
      <HomeHeader />

      <div className="landing__hero text-center">
        <p className="landing__hero__title">
          Managing and tracking habit made easy just for you
        </p>
        <p className="landing__hero__subtitle">
          Prilaku let's you simply track your habits.
        </p>
        <Link href="/home">
          <a className="landing__hero__cta">Go to the app</a>
        </Link>
      </div>

      <div className="landing__image">
        <div>
          <img src="images/dashboard.png" alt="" />
        </div>
      </div>

      <div className="landing__feature">
        <p className="title">Track your own habit</p>
        <p className="subtitle">Designed for daily use</p>

        <div className="row gap-3">
          <div className="landing__feature__card col-12 col-sm">
            <img src="/images/ic_book.svg" alt="Icon book" />
            <p className="title">Review your habits daily</p>
            <p className="body">See your habits for the day</p>
          </div>

          <div className="landing__feature__card col-12 col-sm">
            <img src="/images/ic_calendar.svg" alt="Icon calendar" />
            <p className="title">Track your habit</p>
            <p className="body">Easily track history of your habit</p>
          </div>

          <div className="landing__feature__card col-12 col-sm">
            <img src="/images/ic_chart.svg" alt="" />
            <p className="title">Habit summary</p>
            <p className="body">
              We give you statistics so you know where you going
            </p>
          </div>
        </div>
      </div>

      <div className="landing__get-started">
        <p className="title">Get started with Prilaku today</p>
        <p className="subtitle">
          Prilaku keeps your habits organized. Start tracking habit today!
        </p>
        <Link href="/home">
          <a className="landing__hero__cta">Go to the app</a>
        </Link>
      </div>

      <div className="landing__footer d-flex flex-column gap-2 align-items-center flex-md-row justify-content-md-between">
        <div className="brand">
          <Logo width="30" />
          <p>Prilaku</p>
        </div>

        <p>@ 2022 Prilaku. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
