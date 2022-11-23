import React, { useState } from "react";
import Calendar from "react-calendar";

const CalendarComponent = ({ value, setValue }) => {
  return (
    <div>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default CalendarComponent;
