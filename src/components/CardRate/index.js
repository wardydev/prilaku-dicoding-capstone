import React from "react";
import Card from "../Card";

const CardRate = ({ color = "#f5f0f05d", rateName, rateCount, message }) => {
  return (
    <Card color={color}>
      <h6 className="fw-medium">{rateName}</h6>
      <div>
        <h2 className="display-6 fw-bold mb-1" style={{ marginBottom: -6 }}>
          {rateCount}
        </h2>
        <span className="opacity-75">{message}</span>
      </div>
    </Card>
  );
};

export default CardRate;
