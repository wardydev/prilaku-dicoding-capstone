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
          <a href="#" class="btnLogin">
            Login
          </a>
        </div>
      </div>

      <div className="landing__hero text-center">
        <p className="landing__hero__title">
          The habit tracker you get into the habit of using
        </p>
        <p className="landing__hero__subtitle">
          Prilaku let's you simply track your habits.
        </p>
        <a href="#" className="landing__hero__cta">Go to the app</a>
      </div>
    </div>
  );
};

export default Home;
