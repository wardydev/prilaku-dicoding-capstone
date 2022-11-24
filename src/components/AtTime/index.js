import React, { useState } from "react";
import styles from "./AtTime.module.scss";

const AtTime = ({ data, setValue }) => {
  const [selectedTime, setSelectedTime] = useState();

  const handleTimePick = (e, id) => {
    setSelectedTime(id);
    setValue(e.target.dataset.hours);
  };

  return (
    <div className="row">
      {data?.map((time) => {
        return (
          <div className="mb-3 col-4" key={time.id}>
            <button
              data-hours={time.hours}
              className={styles.btnNormal}
              style={
                selectedTime === time.id
                  ? { backgroundColor: "#1AB0B0" }
                  : { backgroundColor: "#d9d9d931" }
              }
              onClick={(e) => handleTimePick(e, time.id)}
            >
              <ion-icon name={time.iconName} data-hours={time.hours}></ion-icon>
              <span className="ms-1" data-hours={time.hours}>
                {time.timeName}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AtTime;
