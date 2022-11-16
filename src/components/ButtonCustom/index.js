import React from "react";
import styles from "./ButtonCustom.module.scss";

const ButtonCustom = ({ title, isIcon = false, size = "normal" }) => {
  let btnSize;
  switch (size) {
    case "normal":
      btnSize = styles.btnNormal;
      break;
    case "large":
      btnSize = styles.btnLarge;
  }
  return (
    <button className={btnSize}>
      {isIcon && <ion-icon name="add"></ion-icon>}
      <span className="ms-1">{title}</span>
    </button>
  );
};

export default ButtonCustom;
