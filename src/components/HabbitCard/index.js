import React from "react";

import Card from "../Card";
import styles from "./HabbitCard.module.scss";

const HabbitCard = ({ title, iconName }) => {
  return (
    <div className="d-flex align-items-center">
      <label className={styles.wrapper}>
        <input className={styles.input} type="checkbox" />
        <span className={styles.checkmark}></span>
      </label>
      <div className="ms-2 w-100">
        <Card title={title} iconName={iconName} />
      </div>
    </div>
  );
};

export default HabbitCard;
