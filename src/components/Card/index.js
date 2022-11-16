import React from "react";

const Card = ({ children, color = "#f5f0f05d" }) => {
  return (
    <div className="rounded rounded-lg p-3" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export default Card;
