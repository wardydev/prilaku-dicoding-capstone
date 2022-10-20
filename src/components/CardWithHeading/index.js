import React from "react";
import PropTypes from "prop-types";

import Card from "../Card";

const CardWithHeading = ({ icon, headingTitle, column, isViewAll }) => {
  if (column === 5) {
    column = "col-sm-12 col-md-6 col-lg-2";
  } else if (column === 4) {
    column = "col-sm-12 col-md-6 col-lg-3";
  } else if (column === 3) {
    column = "col-sm-12 col-md-6 col-lg-4";
  } else if (column === 2) {
    column = "col-sm-12 col-md-6 col-lg-6";
  } else {
    column = "col-sm-12 col-md-12 col-lg-12";
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center">
          {icon}
          <h2 className="ms-2">{headingTitle}</h2>
        </div>
        {isViewAll && <span>View All</span>}
      </div>
      <div className="row">
        <div className={column}>
          <Card />
        </div>
      </div>
    </div>
  );
};

CardWithHeading.propTypes = {
  icon: PropTypes.element.isRequired,
  headingTitle: PropTypes.string.isRequired,
  column: PropTypes.number.isRequired,
  isViewAll: PropTypes.bool.isRequired,
};

export default CardWithHeading;
