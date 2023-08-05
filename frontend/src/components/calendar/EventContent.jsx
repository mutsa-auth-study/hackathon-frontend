import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"

function EventContent(eventInfo) {
  return <EventItem>{eventInfo.event.title}</EventItem>
}

export default EventContent

const EventItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 15px;
  padding: 0 2px;
  background-color: ${theme.colors.primaryColor};
  border-radius: 2px;

  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.calendarEvent};
`
