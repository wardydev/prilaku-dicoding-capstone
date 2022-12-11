import Link from "next/link";
import { useEffect, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { IoCloseCircleSharp } from "react-icons/io5";
import { getUserInfo } from "../../utils/functions";
import Logo from "../Logo";

const HomeHeader = () => {
  const [drawer, setDrawer] = useState("closed");
  const [user, setUser] = useState("");

  useEffect(() => {
    const usedData = JSON.parse(getUserInfo());

    setUser(usedData);
  }, []);

  useEffect(() => {}, [setDrawer]);

  const toggleDrawer = () =>
    setDrawer((prevState) => (prevState === "open" ? "closed" : "open"));

  return (
    <div className="landing__header py-4 d-flex align-items-center justify-content-between">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
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
              <a
                style={{ textDecoration: "none", color: "#3c4043" }}
                className="active"
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a style={{ textDecoration: "none", color: "#3c4043" }}>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a style={{ textDecoration: "none", color: "#3c4043" }}>About</a>
            </Link>
          </li>
          {user ? (
            <li>
              <Link href="/home">
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  className="btn-login"
                >
                  Dashboard
                </a>
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login">
                <a
                  style={{ textDecoration: "none", color: "#fff" }}
                  className="btn-login"
                >
                  Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HomeHeader;
