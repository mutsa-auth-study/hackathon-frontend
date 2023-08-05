import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { LoginMessage } from "../../constants/LoginMessage"
import Kakao from "./kakao"

function Login(props) {
  return (
    <LoginContainer>
      <Blank />
      <Ment>{LoginMessage}</Ment>
      <Kakao />
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 400px;
  padding: 40px 20px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.grayBorder};
`

const Ment = styled.p`
  font-weight: 600;
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.paragraph};

  line-height: 160%;
  text-align: center;
  white-space: pre-line;
`

const Blank = styled.div`
  width: 10px;
  height: 10px;
`
