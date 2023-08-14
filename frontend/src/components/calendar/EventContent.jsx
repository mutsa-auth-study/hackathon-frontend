import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { priorityEnum } from "../../constants/Priority"
import { useRecoilValue } from "recoil"
import calendarExamInfo from "../../store/atom/calendarExamInfo"
import { Tooltip } from "react-tooltip"
import "../../styles/tooltip.css"

function EventContent({ event }) {
  const eventInfo = useRecoilValue(calendarExamInfo)

  return (
    <EventItem
      prioirty={event.extendedProps.prioirty}
      withinday={event.extendedProps.withinday}
      data-tooltip-id={`tooltip-${event.extendedProps.title}`}
      data-tooltip-content={eventInfo}
      data-tooltip-place="top"
    >
      {event.title}

      <Tooltip
        id={`tooltip-${event.extendedProps.title}`}
        place="top"
        effect="solid"
        clickable={true}
        className="custom-tooltip"
        classNameArrow="custom-tooltip-arrow"
      />
    </EventItem>
  )
}

export default EventContent

const EventItem = styled.div`
  display: flex;
  position: relative;
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
