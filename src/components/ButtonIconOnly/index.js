import React from 'react';
import styles from './ButtonIconOnly.module.scss';

const ButtonIconOnly = ({ isCircle = false, ariaLabel, handleClick, children }) => {

  return (
    <button
      className={`${styles['button-icon-only']}`} aria-label={ariaLabel}
      onClick={handleClick}
    >
      <span aria-hidden={true} className={`${isCircle ? styles['button__circle'] : ''}`}>{children}</span>
    </button>
  );
}

export default ButtonIconOnly;
