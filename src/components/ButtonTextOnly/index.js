import React from "react";
import styles from "./ButtonTextOnly.module.scss";

const ButtonTextOnly = ({ bgColor = '#FEFFFF', borderColor = '#C3C4C5', handleClick, children }) => {
  return (
    <button
      className={styles['button-text-only']}
      onClick={handleClick}
      style={{backgroundColor: bgColor, border: `1px solid ${borderColor}`}}
    >
      {children}
    </button>
  );
}

export default ButtonTextOnly;
