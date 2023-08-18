import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { styled } from "styled-components"
import "./../../styles/myCalendar.css"
import theme from "../../styles/Theme"

// https://fullcalendar.io/docs#toc

function CalendarNoEvent(props) {
  return (
    <CalendarContainer>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next",
        }}
      />
    </CalendarContainer>
  )
}

export default CalendarNoEvent

const CalendarContainer = styled.div`
  width: 1500px;
  padding: 24px 72px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.black};

  overflow: hidden;

  font-family: "Pretendard";
`
