import React, { useState } from "react";
import Calendar from "react-calendar";

const CalendarComponent = ({ value, setValue, activeStartDate }) => {
  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(value) => setValue(value)}
        activeStartDate={activeStartDate}
      />
    </div>
  );
};

export default CalendarComponent;
