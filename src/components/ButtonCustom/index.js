import React from "react";
import styles from "./ButtonCustom.module.scss";

const ButtonCustom = ({
  title,
  isIcon = false,
  size = "normal",
  iconName,
  isFullWidth = false,
  handlePress,
  color = "#d9d9d931",
}) => {
  let btnSize;
  switch (size) {
    case "normal":
      btnSize = styles.btnNormal;
      break;
    case "large":
      btnSize = styles.btnLarge;
      break;
  }
  return (
    <button
      className={isFullWidth ? styles.btnNormalFull : btnSize}
      onClick={handlePress}
      style={{ backgroundColor: color }}
    >
      {isIcon && <ion-icon name={iconName}></ion-icon>}
      <span className="ms-1">{title}</span>
    </button>
  );
};

export default ButtonCustom;
