import Link from "next/link";
import React from "react";
import Logo from "../src/components/Logo";

const Home = () => {
  return (
    <div className="landing container">
      <div className="landing__header py-4 d-flex align-items-center justify-content-between">
        <Logo />
        <div className="landing__header__nav d-flex gap-2">
          <a href="#">Home</a>
          <a href="#">Blog</a>
          <a href="#">Guide</a>
          <a href="#">About</a>
          <Link href="/login">
            <a className="btn-login">Login</a>
          </Link>
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
    </div>
  );
};

export default Home;
