import React from "react";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import { formatterDateToObject } from "../../utils/functions";

// eslint-disable-next-line react/display-name
const ButtonInvisible = React.forwardRef((props, ref) => {
  const scrollToToday = () => {
    const today = document.querySelector('.Calendar__day.-today');
    const selectedDate = document.querySelector('.Calendar__day.-selected')
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

  // const changeView = (selected) => {
  //   const selectedDate = document.querySelector('.Calendar__day.-selected');
  //   selectedDate.scrollIntoView({inline: "center"})
  // }

  React.useEffect(() => {
    buttonRef.current.click();
  }, []);

  return (
    <div>
      <Calendar
        value={formatterDateToObject(habbitsDateActive)}
        onChange={(selected) => {
          setHabbitsDateActive(new Date([selected.month, selected.day, selected.year]))
        }}
        colorPrimary="#5899E8"
        colorPrimaryLight="#FEFFFF"
        shouldHighlightWeekends
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
