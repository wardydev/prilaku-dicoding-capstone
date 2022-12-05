import React, { useState } from "react";
import styles from "./AtTime.module.scss";

const AtTime = ({ data, setValue }) => {
  const [selectedTime, setSelectedTime] = useState();

  const handleTimePick = (e, id) => {
    setSelectedTime(id);
    const data = {
      name: e.target.dataset.time,
      hours: e.target.dataset.hours,
      icon: e.target.dataset.icon,
    };
    setValue(data);
  };

  return (
    <div className={styles['time-select']}>
      {data?.map((time) => {
        return (
          <div className="" key={time.id}>
            <button
              data-hours={time.hours}
              data-icon={time.iconName}
              data-time={time.timeName}
              className={styles['button-time']}
              style={
                selectedTime === time.id
                  ? { backgroundColor: "#2f7fe2" }
                  : { backgroundColor: "#21242b" }
              }
              onClick={(e) => handleTimePick(e, time.id)}
            >
              {
                time.iconName 
                ?  <ion-icon
                    name={time.iconName}
                    data-hours={time.hours}
                    data-icon={time.iconName}
                    data-time={time.timeName}
                  ></ion-icon>
                : ''
              }
              <span
                data-hours={time.hours}
                data-icon={time.iconName}
                data-time={time.timeName}
              >
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
