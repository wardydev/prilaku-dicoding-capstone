import React from "react";
import Image from "next/image";

import styles from "./Header.module.scss";

const Header = ({ title, imageUrl }) => {
  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <Image
        src={imageUrl}
        width={50}
        height={50}
        alt="image profile"
        className={styles.image}
      />
    </div>
  );
};

export default Header;
