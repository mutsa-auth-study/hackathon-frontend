import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Calendar from "./../components/calendar/Calendar"
import Header from "../components/header/header"
import Carousel from "../components/Carousel"
import Login from "../components/auth/login"
import { LoginFollowMessage } from "../constants/LoginMessage"
import useFetch from "../hooks/useFetch"
import { useRecoilValue } from "recoil"
import { user } from "../store/atom/user"
import UserInfo from "../components/auth/userinfo"
import getCarouselContent from "./../function/getCarouselContent"
import getCalendarEvents from "../function/getCalendarEvents"

function Main() {
  const [examInfo, setExamInfo] = useState([])
  const { data, loading, error } = useFetch("/main")

  const isLogin = useRecoilValue(user).accessToken // 로그인 정보 확인
  const username = useRecoilValue(user).profile_nickname

  useEffect(() => {
    if (data) {
      setExamInfo(data.information)
    }
  }, [data])

  return (
    <MainContainer>
      <Header />
      <Banner>
        {examInfo.length > 0 && (
          <Carousel content={getCarouselContent(examInfo, username)} />
        )}
        {isLogin ? <UserInfo /> : <Login />}
      </Banner>
      <ScheduleCalendar>
        <SubTitle>일정 한 눈에 보기</SubTitle>
        {examInfo.length > 0 && (
          <Calendar events={getCalendarEvents(examInfo)} />
        )}
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
