import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { user } from "../../store/atom/user"
import tab from "../../store/atom/tab"

function Header(props) {
  const url = window.location.href.split("/")
  const page = url[url.length - 1]

  const isLogin = useRecoilValue(user).accessToken // 로그인 정보 확인
  const resetUserinfo = useResetRecoilState(user) // 로그아웃 시 로컬스토리지에서 삭제
  const resetTab = useResetRecoilState(tab) // 로그아웃 시 로컬스토리지에서 삭제

  const logout = () => {
    resetUserinfo()
    resetTab()
  }

  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImage src="" alt="logo" />
        <ServiceName>TestMate</ServiceName>
      </Logo>
      <Navigation>
        <NavigateItem to="/exam" accent={page === "search" ? 1 : 0}>
          추천
        </NavigateItem>
        <NavigateItem to="/location" accent={page === "location" ? 1 : 0}>
          고사장 확인
        </NavigateItem>
        <NavigateItem to="/mypage" accent={page === "mypage" ? 1 : 0}>
          마이페이지
        </NavigateItem>
      </Navigation>
      {isLogin ? (
        <Logout onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <Text>로그아웃</Text>
        </Logout>
      ) : (
        <Blank />
      )}
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

const Logo = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${theme.colors.white};
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
  font-weight: ${props => (props.accent ? 600 : 300)};
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

const Blank = styled.div`
  width: 10px;
  height: 10px;
`

const Text = styled.div`
  margin-left: 5px;
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.button};
  font-weight: 600;
`
