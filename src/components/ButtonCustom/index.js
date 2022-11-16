import React from "react";
import styles from "./ButtonCustom.module.scss";

const ButtonCustom = ({
  title,
  isIcon = false,
  size = "normal",
  iconName,
  isFullWidth,
}) => {
  let btnSize;
  switch (size) {
    case "normal":
      btnSize = styles.btnNormal;
      break;
    case "large":
      btnSize = styles.btnLarge;
  }
  return (
    <button className={isFullWidth ? styles.btnNormalFull : btnSize}>
      {isIcon && <ion-icon name={iconName}></ion-icon>}
      <span className="ms-1">{title}</span>
    </button>
  );
};

export default ButtonCustom;
