import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { useRecoilValue } from "recoil"
import { user } from "../../store/atom/user"

function UserInfo() {
  const userinfo = useRecoilValue(user)

  return (
    <LoginContainer>
      <ProfileImage src={userinfo.profile_image} />
      <Ment>{`${userinfo.profile_nickname}님, 안녕하세요`}</Ment>
      <Blank />
    </LoginContainer>
  )
}

export default UserInfo

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

const ProfileImage = styled.img`
  width: 122px;
  height: 122px;
  border-radius: 50%;
  object-fit: cover;
`

const Blank = styled.div`
  width: 10px;
  height: 10px;
`
