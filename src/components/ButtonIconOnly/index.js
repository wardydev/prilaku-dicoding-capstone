import React from 'react';
import styles from './ButtonIconOnly.module.scss';

const ButtonIconOnly = ({ isCircle = false, ariaLabel, handleClick, bgColor, color, children }) => {

  return (
    <button
      className={`${styles['button-icon-only']}`} aria-label={ariaLabel}
      onClick={handleClick}
      style={{backgroundColor: `${bgColor}`, color: `${color}`}}
    >
      <span aria-hidden={true} className={`${isCircle ? styles['button__circle'] : ''}`}>{children}</span>
    </button>
  );
}

export default ButtonIconOnly;
