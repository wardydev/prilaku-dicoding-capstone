import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Header.module.scss";
import { getUserInfo } from "../../utils/functions";

const Header = ({ title }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    const { user } = JSON.parse(getUserInfo());

    if (user.photoURL) {
      setImg(user.photoURL);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div></div>
      <h4>{title}</h4>
      <Image
        src={img || "/images/deadpool.svg"}
        width={48}
        height={48}
        alt="image profile"
        className={styles.image}
      />
    </div>
  );
};

export default Header;
