import React from "react";
import styles from "./ButtonTextWithIcon.module.scss";

const ButtonTextWithIcon = ({ 
    bgColor = '#5899E8',
    color = 'white',
    icon = '',
    handleClick,
    children 
  }) => {
  return (
    <button 
      onClick={handleClick}
      className={styles['button-text-with-icon']}
      style={{backgroundColor: bgColor, color: color}}
      data-typebutton="button text with icon"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default ButtonTextWithIcon;
