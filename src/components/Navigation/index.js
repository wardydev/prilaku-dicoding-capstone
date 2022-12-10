import React from "react";
import Link from "next/link";

const Navigation = ({ styles }) => {
  return (
    <nav className={styles['navigation']}>
      <ul className={styles['navigation-links']}>
        <li>
          <Link href="/home">
              <a>
                <ion-icon name="calendar-clear-outline"></ion-icon>
                <span>home</span>
              </a>
          </Link>
        </li>
        <li>
          <Link href="/history">
              <a>
                <ion-icon name="reload-circle-outline"></ion-icon>
                <span>history</span>
              </a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
              <a>
                <ion-icon name="albums-outline"></ion-icon>
                <span>blog</span>
              </a>
          </Link>
        </li>
        <li>
          <Link href="/user">
              <a>
                <ion-icon name="person-outline"></ion-icon>
                <span>User</span>
              </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;
