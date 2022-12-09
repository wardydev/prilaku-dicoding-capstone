import React from 'react';
import styles from './ButtonIconOnly.module.scss';

const ButtonIconOnly = ({ 
  isCircle = false,
  ariaLabel,
  handleClick,
  bgColor = '#5899E8',
  children
  }) => {

  return (
    <button
      className={`${styles['button-icon-only']}`} aria-label={ariaLabel}
      onClick={handleClick}
      data-typebutton="button icon only"
    >
      <span 
        aria-hidden={true} 
        className={`${isCircle ? styles['button__circle'] : ''}`}
        style={{backgroundColor: bgColor}}
      >
        {children}
      </span>
    </button>
  );
}

export default ButtonIconOnly;
