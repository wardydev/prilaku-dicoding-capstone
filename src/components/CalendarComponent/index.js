import React, { useState } from "react";
import Calendar from "react-calendar";
import Heading from "../Heading";

const CalendarComponent = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default CalendarComponent;
