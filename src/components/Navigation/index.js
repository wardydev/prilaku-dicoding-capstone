import React from "react";
import Link from "next/link";
import { MdDateRange, MdOutlineAutoGraph } from "react-icons/md";
import { FaMap } from "react-icons/fa";
import { RiUser3Fill } from "react-icons/ri";

const Navigation = ({ styles }) => {
  return (
    <nav className="navigation">
      <ul className={styles['navigation-links']}>
        <li>
          <Link href="/home">
              <a>
                <MdDateRange />
                <span>Home</span>
              </a>
          </Link>
        </li>
        <li>
          <Link href="/journey">
              <a>
                <FaMap />
                <span>Journey</span>
              </a>
          </Link>
        </li>
        <li>
          <Link href="/history">
              <a>
                <MdOutlineAutoGraph />
                <span>History</span>
              </a>
          </Link>
        </li>
        <li>
          <Link href="/users">
              <a>
                <RiUser3Fill />
                <span>Users</span>
              </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;
