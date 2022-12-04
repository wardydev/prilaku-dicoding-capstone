import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Header.module.scss";
import { getUserInfo } from "../../utils/functions";

/* 
const Header = ({ title }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    const { user } = JSON.parse(getUserInfo());

    if (user.photoURL) {
      setImg(user.photoURL);
    }
  }, []);
}
*/

const Header = ({ title, children }) => {
  return (
    <div className={styles['header-bar']}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Header;
