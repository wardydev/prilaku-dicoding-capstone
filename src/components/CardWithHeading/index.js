import React from "react";
import PropTypes from "prop-types";

const CardWithHeading = ({ icon, headingTitle, isViewAll, card }) => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center">
          {icon}
          <h2 className="ms-3 fs-3">{headingTitle}</h2>
        </div>
        {isViewAll && <span>View All</span>}
      </div>
      <div className="row">{card}</div>
    </div>
  );
};

CardWithHeading.propTypes = {
  icon: PropTypes.element.isRequired,
  headingTitle: PropTypes.string.isRequired,
  isViewAll: PropTypes.bool.isRequired,
  card: PropTypes.element.isRequired,
};

export default CardWithHeading;
