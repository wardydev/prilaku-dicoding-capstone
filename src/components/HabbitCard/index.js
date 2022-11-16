import React from "react";
import styles from "./HabbitCard.module.scss";

const HabbitCard = ({ title, iconName, color = "#f5f0f05d" }) => {
  return (
    <div className="d-flex align-items-center">
      <label className={styles.wrapper}>
        <input className={styles.input} type="checkbox" />
        <span className={styles.checkmark}></span>
      </label>
      <div
        className="w-100 rounded rounded-lg p-4 d-flex align-items-center ms-2"
        style={{ backgroundColor: color }}
      >
        <ion-icon name={iconName}></ion-icon>
        <span className="ms-3 fw">
          <strong>{title}</strong>
        </span>
      </div>
    </div>
  );
};

export default HabbitCard;
