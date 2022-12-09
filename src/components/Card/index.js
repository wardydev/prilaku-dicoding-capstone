import React from "react";

const Card = ({ children, color = "rgb(235 236 236 / 50%)" }) => {
  return (
    <div className="rounded rounded-lg p-3" style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export default Card;
