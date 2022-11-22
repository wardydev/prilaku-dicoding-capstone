import React from "react";
import ButtonCustom from "../ButtonCustom";

const AtTime = () => {
  return (
    <div className="row">
      <div className="col-6 mb-3">
        <ButtonCustom
          title="All"
          isIcon={true}
          size="normal"
          iconName="home"
          isFullWidth={true}
        />
      </div>
      <div className="col-6 mb-3">
        <ButtonCustom
          title="Morning"
          isIcon={true}
          size="normal"
          iconName="home"
          isFullWidth={true}
        />
      </div>
      <div className="col-6 mb-3">
        <ButtonCustom
          title="Evening"
          isIcon={true}
          size="normal"
          iconName="home"
          isFullWidth={true}
        />
      </div>
      <div className="col-6 mb-3">
        <ButtonCustom
          title="Afternoon"
          isIcon={true}
          size="normal"
          iconName="home"
          isFullWidth={true}
        />
      </div>
    </div>
  );
};

export default AtTime;
