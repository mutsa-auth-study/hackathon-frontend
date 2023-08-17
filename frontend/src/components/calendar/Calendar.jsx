import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import { styled } from "styled-components"
import "./../../styles/myCalendar.css"
import EventContent from "./EventContent"
import theme from "../../styles/Theme"
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"
import calendarExamInfo from "../../store/atom/calendarExamInfo"
import { user } from "./../../store/atom/user"
import moment from "moment"

// https://fullcalendar.io/docs#toc

function Calendar(props) {
  const setEventInfo = useSetRecoilState(calendarExamInfo)
  const resetEventinfo = useResetRecoilState(calendarExamInfo)
  const nickname = useRecoilValue(user).profile_nickname

  const showEventInfo = info => {
    let comment = ""
    if (info._def.extendedProps.withinday) {
      comment = `${info.title} 시험 당일입니다.
      행운을 빌어요! 시험 잘 보세요${nickname ? ` ${nickname}님` : " "}:)`
    } else {
      comment = `${info.title} 시험
      접수 시작일: ${moment(info._instance.range.start).format("YYYY-MM-DD")}
      접수 마감일: ${moment(info._instance.range.end)
        .subtract(1, "d")
        .format("YYYY-MM-DD")}
      응시료: XX,XXX원
      접수 사이트 바로가기: url 링크`
    }
    setEventInfo(comment)
  }
  const closeEventInfo = () => {
    resetEventinfo()
  }

  return (
    <CalendarContainer>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={props.events}
        eventMouseEnter={mouseEnterInfo => showEventInfo(mouseEnterInfo.event)}
        eventMouseLeave={closeEventInfo}
        eventContent={info => {
          return <EventContent event={info.event} />
        }}
        forceEventDuration={true}
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
  padding: 24px 72px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.black};

  overflow: hidden;

  font-family: "Pretendard";
`
