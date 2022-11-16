import React from "react";

const Card = ({ title, iconName }) => {
  return (
    <div className="bg-primary w-100 rounded rounded-lg p-4 d-flex align-items-center mt-3">
      <ion-icon name={iconName}></ion-icon>
      <span className="ms-3 fw">
        <strong>{title}</strong>
      </span>
    </div>
  );
};

export default Card;
