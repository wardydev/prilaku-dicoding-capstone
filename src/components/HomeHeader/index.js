import Link from "next/link";
import { useEffect, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { IoCloseCircleSharp } from "react-icons/io5";
import Logo from "../Logo";

const HomeHeader = () => {
  const [drawer, setDrawer] = useState("closed");

  useEffect(() => {}, [setDrawer]);

  const toggleDrawer = () =>
    setDrawer((prevState) => (prevState === "open" ? "closed" : "open"));

  return (
    <div className="landing__header py-4 d-flex align-items-center justify-content-between">
      <Logo />
      <div
        className="hamburgerBtn"
        aria-label="open navigation drawer"
        onClick={toggleDrawer}
      >
        <GoThreeBars aria-hidden="true" />
      </div>
      <div
        className={`landing__header__nav ${
          drawer === "open" ? "open-drawer" : ""
        }`}
      >
        <div
          className="hamburgerCloseBtn"
          aria-label="close navigation drawer"
          onClick={toggleDrawer}
        >
          <IoCloseCircleSharp />
        </div>
        <ul className="nav-links">
          <li>
            <Link href="/">
              <a className="active">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>Blog</a>
            </Link>
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
  );
};

export default HomeHeader;
