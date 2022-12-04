import React, { useState } from "react";
import Calendar from "react-calendar";
import styles from "./CalendarComponent.module.scss";

const CalendarComponent = ({ value, setValue, activeStartDate }) => {
  const dayArray = ['SUN', 'MON', 'TUE', 'WED','THU', 'FRI', 'SAT'];

  const tile = ({ date }) => {
    const dayNumber = date.getDay();
    return <p>{dayArray[dayNumber]}</p>;
  }

  const onMonth  = (value, event) => alert('Clicked month: ', value)

  return (
    <>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(value) => setValue(value)}
        defaultActiveStartDate={activeStartDate}
        tileContent={tile}
        className={styles['react-calendar']}
        onClickMonth={onMonth}
        showNavigation={false}
      />
    </>
  );
};

export default CalendarComponent;
