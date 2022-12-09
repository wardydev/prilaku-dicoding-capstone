import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="mb-3">
      <h5 style={{fontSize: '16px'}}>{title}</h5>
    </div>
  );
};

export default Heading;
