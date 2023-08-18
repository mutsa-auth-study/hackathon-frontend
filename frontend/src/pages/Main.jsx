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
import Loading from "../components/util/loading"
import { ServerError } from "../constants/ErrorMessage"
import CalendarNoEvent from "../components/calendar/CalendarNoEvent"
import CarouselNoEvent from "../components/CarouselNoEvent"

function Main() {
  const [examInfo, setExamInfo] = useState([])
  const isLogin = useRecoilValue(user).accessToken // 로그인 정보 확인
  const username = useRecoilValue(user).profile_nickname
  const user_id = useRecoilValue(user).user_id

  // 로그인 하지 않을 때는 그냥 보내며, 로그인 후에는 user_id와 accessToken을 같이 넘긴다.
  const { data, loading, error } = useFetch(
    "/exam/main",
    isLogin ? { user_id } : null,
    isLogin
      ? {
          Authorization: `Bearer ${isLogin}`,
        }
      : null,
  )

  useEffect(() => {
    if (data) {
      setExamInfo(data.information)
    }
  }, [data])

  useEffect(() => {
    console.log(examInfo)
  }, [examInfo])

  return (
    <MainContainer>
      <Header />
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <>
          <Error>{ServerError}</Error>
          {isLogin ? <UserInfo /> : <Login />}
        </>
      ) : (
        <>
          <Banner>
            {examInfo ? (
              examInfo.length > 0 ? (
                <Carousel content={getCarouselContent(examInfo, username)} />
              ) : examInfo.length === 0 ? (
                <CarouselNoEvent />
              ) : null
            ) : null}
            {isLogin ? <UserInfo /> : <Login />}
          </Banner>
          <ScheduleCalendar>
            <SubTitle>일정 한 눈에 보기</SubTitle>
            {examInfo ? (
              examInfo.length > 0 ? (
                <Calendar events={getCalendarEvents(examInfo)} />
              ) : examInfo.length === 0 ? (
                <CalendarNoEvent />
              ) : null
            ) : null}
            <Message view={isLogin ? 0 : 1}>{LoginFollowMessage}</Message>
          </ScheduleCalendar>
        </>
      )}
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
  display: ${props => (props.view ? "block" : "none")};
  margin: 80px 0;
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.paragraph};
`

const Error = styled.div`
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.subtitle};
  font-weight: 600;
  line-height: 150%;

  white-space: pre-line;
  text-align: center;
`
