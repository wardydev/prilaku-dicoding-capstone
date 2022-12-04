import React from "react";
import styles from "./button.module.scss";
import PropTypes from "prop-types";

const Button = ({ handleClick, buttonText = '', icon = '' }) => {
  const Content = () => {
    if (icon === false) {
      return <>{buttonText}</>
    } else if (icon && buttonText === false) {
      return <>{icon}</>
    } else {
      return (
        <>
          {icon}
          <span>{buttonText}</span>
        </>
      );
    }
  }

  return (
    <button
      className={icon && buttonText ? styles : ''}
      onClick={handleClick}
    >
      <Content />
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func,
};

export default Button;
