import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { priorityEnum } from "../../constants/Priority"

function EventContent(eventInfo) {
  console.log(eventInfo.event.extendedProps)
  return (
    <EventItem
      prioirty={eventInfo.event.extendedProps.prioirty}
      withinday={eventInfo.event.extendedProps.withinday}
    >
      {eventInfo.event.title}
    </EventItem>
  )
}

export default EventContent

const EventItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 15px;
  padding: 0 2px;
  background-color: ${props =>
    props.withinday
      ? theme.priorityColor.secondary[priorityEnum[props.prioirty]]
      : theme.priorityColor.primary[priorityEnum[props.prioirty]]};
  border-radius: 2px;
  border: none;

  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.calendarEvent};
`
