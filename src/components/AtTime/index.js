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
    <div className="d-flex flex-wrap gap-3">
      {data?.map((time) => {
        return (
          <div key={time.id}>
            <button
              data-hours={time.hours}
              data-icon={time.iconName}
              data-time={time.timeName}
              className={styles.btnNormal}
              style={
                selectedTime === time.id
                  ? { backgroundColor: "#E05C1A" }
                  : { backgroundColor: "#d9d9d931" }
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
