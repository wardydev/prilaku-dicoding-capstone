import React from "react";
import styles from "./CardRate.module.scss";

const CardRate = ({ color = "#5899E8", rateName, rateCount }) => {
  return (
    <div className={styles["card-rate"]} style={{ backgroundColor: color }}>
      <h3 className={styles["card-rate__name"]}>{rateName}</h3>
      <div className={styles["card-rate__count"]}>
        <h3 style={{ fontSize: "2.4rem" }}>{rateCount}</h3>
      </div>
    </div>
  );
};

export default CardRate;
