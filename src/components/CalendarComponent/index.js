import React from "react";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { formatterDateToObject } from "../../utils/functions";
import styles from "./Calendar.module.scss";

// eslint-disable-next-line react/display-name
const ButtonInvisible = React.forwardRef((props, ref) => {
  const scrollToToday = () => {
    const today = document.querySelector('.main-calendar .Calendar__day.-today');
    const selectedDate = document.querySelector('.main-calendar .Calendar__day.-selected')
    if (today) {
      today.scrollIntoView({inline: "center"})
    } else {
      selectedDate.scrollIntoView({inline: "center"})
    }
  }

  return (
    <div ref={ref} onClick={() => scrollToToday()} style={{visibility: "hidden"}}>
      hello
    </div>
  )
});

const CalendarComponent = ({ habbitsDateActive, setHabbitsDateActive }) => {
  const buttonRef = React.createRef();

  React.useEffect(() => {
    buttonRef.current.click();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Calendar
        style={styles['Calendar']}
        value={formatterDateToObject(habbitsDateActive)}
        onChange={(selected) => {
          setHabbitsDateActive(new Date([selected.month, selected.day, selected.year]))
        }}
        colorPrimary="#5899E8"
        colorPrimaryLight="#FEFFFF"
        shouldHighlightWeekends
        calendarClassName="main-calendar"
        renderFooter={() => (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
            <ButtonInvisible ref={buttonRef}/>
          </div>
        )}
      />
    </div>
  );
};

export default CalendarComponent;
