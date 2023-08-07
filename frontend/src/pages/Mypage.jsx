import React from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Tab from "../components/util/tab"
import Header from "../components/header/header"
import { useRecoilValue } from "recoil"
import tab from "../store/atom/tab"

function Mypage(props) {
  const tabItem = useRecoilValue(tab)

  return (
    <MypageContainer>
      <Header />
      <Tab />
      <ContentTitle>{tabItem.title}</ContentTitle>
      <ContentView>{tabItem.content}</ContentView>
    </MypageContainer>
  )
}

export default Mypage

const MypageContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`

const ContentTitle = styled.h2`
  margin-bottom: 80px;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.tabtitle};
  text-align: center;
`

const ContentView = styled.section`
  height: 100vh;
`
