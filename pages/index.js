import Link from "next/link";
import React from "react";
import Logo from "../src/components/Logo";
import { GoThreeBars } from "react-icons/go";
import { IoCloseCircleSharp } from "react-icons/io5";

const Home = () => {
  const [drawer, setDrawer] = React.useState('closed');

  React.useEffect(() => {

  }, [setDrawer]);

  const toggleDrawer = () => setDrawer((prevState) => prevState === 'open' ? 'closed' : 'open');

  return (
    <div className="landing">
      <div className="landing__header py-4 d-flex align-items-center justify-content-between">
        <Logo />
        <div className="hamburgerBtn" aria-label="open navigation drawer" onClick={toggleDrawer}>
          <GoThreeBars aria-hidden="true" />
        </div>
        <div className={`landing__header__nav ${drawer === 'open' ? 'open-drawer' : ''}`}>
          <div className="hamburgerCloseBtn" aria-label="close navigation drawer" onClick={toggleDrawer}>
            <IoCloseCircleSharp />
          </div>
          <ul class="nav-links">
            <li>
              <Link href="/">
                <a class="active">Home</a>
              </Link>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <Link href="/login">
                <a className="btn-login">Login</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="landing__hero text-center">
        <p className="landing__hero__title">
          The habit tracker you get into the habit of using
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
        <Link href="/login">
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
