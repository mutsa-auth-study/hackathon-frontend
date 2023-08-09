import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

function Header(props) {
  return (
    <HeaderContainer>
      <Logo>
        <LogoImage src="" alt="logo" />
        <ServiceName>한눈에시험</ServiceName>
      </Logo>
      <Navigation>
        <NavigateItem to="/exam">맞춤 검색</NavigateItem>
        <NavigateItem to="/location">고사장 확인</NavigateItem>
        <NavigateItem to="/mypage">마이페이지</NavigateItem>
      </Navigation>
      <Logout>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <Text>로그아웃</Text>
      </Logout>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: ${theme.componentSize.maxWidth};
  height: 73px;
  background-color: ${theme.colors.primaryColor};
`

const Logo = styled.div`
  display: flex;
`

const LogoImage = styled.img``

const ServiceName = styled.div`
  color: ${theme.colors.white};
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.logo};
  text-align: center;
`

const Navigation = styled.div`
  display: flex;
  align-items: center;
`

const NavigateItem = styled(Link)`
  margin: 0 10px;
  padding: 0 20px;
  color: ${theme.colors.white};
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.navigation};
  text-decoration: none;
`

const Logout = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 40px;
  margin-right: 154px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.white};

  color: ${theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`

const Text = styled.div`
  margin-left: 5px;
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.button};
  font-weight: 600;
`
