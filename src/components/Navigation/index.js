import React, { useState } from "react";
import Link from "next/link";

const Navigation = ({ styles }) => {
  const [hover, isHover] = useState(false);

  return (
    <nav className={styles["navigation"]}>
      <ul className={styles["navigation-links"]}>
        <li>
          <Link href="/home">
            <a
              style={{
                textDecoration: "none",
                color: "#3c4043",
              }}
            >
              <ion-icon name="calendar-clear-outline"></ion-icon>
              <span>habit</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/history">
            <a
              style={{
                textDecoration: "none",
                color: "#3c4043",
              }}
            >
              <ion-icon name="reload-circle-outline"></ion-icon>
              <span>history</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a
              style={{
                textDecoration: "none",
                color: "#3c4043",
              }}
            >
              <ion-icon name="albums-outline"></ion-icon>
              <span>blog</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/user">
            <a
              style={{
                textDecoration: "none",
                color: "#3c4043",
              }}
            >
              <ion-icon name="person-outline"></ion-icon>
              <span>User</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
