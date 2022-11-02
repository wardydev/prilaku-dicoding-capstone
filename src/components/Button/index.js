import React from "react";
import styles from "./button.module.scss";
import PropTypes from "prop-types";

const Button = ({ title, isOutline = false, size, icon, handleClick }) => {
  let btnSize = { backgroundColor: "gray" };
  if (size === "large") {
    btnSize = { padding: "0.65rem 1.25rem" };
  } else if (size === "normal") {
    btnSize = { padding: "0.5rem 1.25rem" };
  } else if (size === "small") {
    btnSize = { padding: "0.35rem 1.25rem" };
  }
  return (
    <button
      className={isOutline ? styles.buttonOutline : styles.buttonFill}
      style={btnSize}
      onClick={handleClick}
    >
      {icon}
      <span className="ms-2">{title}</span>
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isOutline: PropTypes.bool,
  size: PropTypes.string.isRequired,
  icon: PropTypes.element,
  handleClick: PropTypes.func,
};

export default Button;
