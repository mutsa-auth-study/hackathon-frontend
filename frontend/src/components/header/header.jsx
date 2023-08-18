import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { user } from "../../store/atom/user"
import tab from "../../store/atom/tab"
import { currentLocation } from "../../store/atom/currentLocation"

function Header(props) {
  const location = useLocation()
  const url = location.pathname.split("/")
  const page = url[1]

  const isLogin = useRecoilValue(user).accessToken // 로그인 정보 확인
  const resetUserinfo = useResetRecoilState(user) // 로그아웃 시 로컬스토리지에서 삭제
  const resetTab = useResetRecoilState(tab) // 로그아웃 시 로컬스토리지에서 삭제
  const resetCurrentLocation = useResetRecoilState(currentLocation) // 로그아웃 시 로컬스토리지에서 삭제

  const logout = () => {
    resetUserinfo()
    resetTab()
    resetCurrentLocation()
    window.location.reload()
  }

  return (
    <HeaderContainer>
      <Logo to="/">
        <ServiceName>TestMate</ServiceName>
      </Logo>
      <Navigation>
        <NavigateItem to="/exam" accent={page === "exam" ? 1 : 0}>
          검색
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

const ServiceName = styled.div`
  margin-top: 35px;
  margin-left: 20px;

  color: ${theme.colors.white};
  font-family: "HSSummer";
  font-weight: 100;
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
