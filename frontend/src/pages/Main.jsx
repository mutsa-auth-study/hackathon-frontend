import React from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Calendar from "./../components/calendar/Calendar"
import Header from "../components/header/header"
import Carousel from "../components/Carousel"
import Login from "../components/auth/login"
import { LoginFollowMessage } from "../constants/LoginMessage"

function Main() {
  const carouselContent = [
    {
      title: "제 2회 정보처리기사 원서접수 마감 D-5",
      desc: "마감이 임박했어요",
      background: "/img/carousel1.jpg",
    },
    {
      title: "제 3회 전기기사 원서접수 마감 D-5",
      desc: "마감이 임박했어요",
      background: "/img/carousel2.jpg",
    },
    {
      title: "제 2회 건설사 원서접수 마감 D-5",
      desc: "마감이 임박했어요",
      background: "/img/carousel3.jpg",
    },
  ]
  const events = [
    {
      title: "정보처리기사",
      start: new Date("2023-08-05"),
      end: new Date("2023-08-08"),
    },
    {
      title: "정보처리기능사",
      start: new Date("2023-08-07"),
    },
  ]
  return (
    <MainContainer>
      <Header />
      <Banner>
        <Carousel content={carouselContent} />
        <Login />
      </Banner>
      <ScheduleCalendar>
        <SubTitle>일정 한 눈에 보기</SubTitle>
        <Calendar events={events} />
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
