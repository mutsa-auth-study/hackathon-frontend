import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Calendar from "./../components/calendar/Calendar"
import Header from "../components/header/header"
import Carousel from "../components/Carousel"
import Login from "../components/auth/login"
import { LoginFollowMessage } from "../constants/LoginMessage"
import useFetch from "../hooks/useFetch"

function Main() {
  const [examInfo, setExamInfo] = useState([])

  const { data, loading, error } = useFetch("/main")

  useEffect(() => {
    if (data) {
      console.log(data)
      setExamInfo(data.information)
    }
  }, [data])

  useEffect(() => {
    console.log(events)
  }, [examInfo])

  const carouselContent = examInfo.map((exam, index) => ({
    title: `가장 많이 조회한 시험 Top ${index + 1}\n
  제 ${exam.implSeq}회 ${exam.qualgbnm} 원서접수 마감 D-${3}`,
    desc: `원서 접수 기간: ${exam.docRegStartDt} ~ ${exam.docRegEndDt}\n
  수험생 여러분, 잊지 말고 접수하세요!`,
  }))

  const events = examInfo
    .map(exam => [
      {
        title: exam.qualgbnm,
        start: exam.docRegStartDt,
        end: exam.docRegEndDt,
      },
      {
        title: exam.qualgbnm,
        start: exam.docExamStartDt,
        end: exam.docExamEndDt,
      },
      {
        title: exam.qualgbnm,
        start: exam.pracRegStartDt,
        end: exam.pracRegEndDt,
      },
      {
        title: exam.qualgbnm,
        start: exam.pracExamStartDt,
        end: exam.pracExamEndDt,
      },
    ])
    .flat()

  return (
    <MainContainer>
      <Header />
      <Banner>
        {examInfo.length > 0 && <Carousel content={carouselContent} />}
        <Login />
      </Banner>
      <ScheduleCalendar>
        <SubTitle>일정 한 눈에 보기</SubTitle>
        {examInfo.length > 0 && <Calendar events={events} />}
        <Message>{LoginFollowMessage}</Message>
      </ScheduleCalendar>
    </MainContainer>
  )
}

export default Main

const MainContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`

const Banner = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-areas: "carousel login";
  grid-column-gap: 150px;
  width: 100%;
  padding: 40px 20px;
`

const ScheduleCalendar = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const SubTitle = styled.h2`
  margin: 80px 0;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
`

const Message = styled.p`
  margin: 80px 0;
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.paragraph};
`
