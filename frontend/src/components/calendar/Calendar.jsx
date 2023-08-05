import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { styled } from "styled-components"
import "./../../styles/myCalendar.css"
import EventContent from "./EventContent"
import theme from "../../styles/Theme"

// https://fullcalendar.io/docs#toc

function Calendar(props) {
  return (
    <CalendarContainer>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={props.events}
        eventContent={EventContent}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next",
        }}
      />
    </CalendarContainer>
  )
}

export default Calendar

const CalendarContainer = styled.div`
  width: 1500px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.black};
`
