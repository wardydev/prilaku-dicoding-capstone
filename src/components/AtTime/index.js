import React, { useEffect, useState } from "react";
import styles from "./AtTime.module.scss";

const AtTime = ({ data, setValue }) => {
  const [selectedTime, setSelectedTime] = useState();
  const defaultValue = data[0];

  useEffect(() => {
    setSelectedTime(defaultValue.id);
    setValue({
      name: defaultValue.timeName,
      hours: defaultValue.hours,
      icon: defaultValue.iconName,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div key={time.id}>
            <button
              data-hours={time.hours}
              data-icon={time.iconName}
              data-time={time.timeName}
              className={styles['button-time']}
              style={
                selectedTime === time.id
                  ? { backgroundColor: "#5899E8" }
                  : { backgroundColor: "rgba(235, 236, 236, 0.5)", color: '#272828' }
              }
              onClick={(e) => handleTimePick(e, time.id)}
            >
              <ion-icon
                name={time.iconName}
                data-hours={time.hours}
                data-icon={time.iconName}
                data-time={time.timeName}
              ></ion-icon>
              <span
                className="ms-1"
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
