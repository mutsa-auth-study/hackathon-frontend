import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { useRecoilValue, useResetRecoilState } from "recoil"
import { user } from "../../store/atom/user"
import { request } from "./../../utils/axios"
import { useNavigate } from "react-router-dom"
import useConfirm from "../../hooks/useConfirm"
import { ConfirmMessage } from "../../constants/ConfirmMessage"

function MyProfile() {
  const userinfo = useRecoilValue(user)
  const resetUserinfo = useResetRecoilState(user)

  const navigate = useNavigate()

  const confirmGrant = async () => {
    try {
      const response = await request(
        "delete",
        "/auth/withdraw",
        {
          user_id: userinfo.user_id,
        },
        {
          Authorization: `Bearer ${userinfo.accessToken}`,
        },
      )
      if (response.status === 200) {
        resetUserinfo()
        navigate("/")
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const withdraw = useConfirm(ConfirmMessage.withdraw, confirmGrant)

  return (
    <MyProfileContainer>
      <ProfileImage src={userinfo.profile_image} alt="profile" />
      <Name>{userinfo.profile_nickname}</Name>
      <Email>
        <Label>이메일</Label>
        <Content>{userinfo.email}</Content>
      </Email>
      <WithdrawButton onClick={withdraw}>탈퇴하기</WithdrawButton>
    </MyProfileContainer>
  )
}

export default MyProfile

const MyProfileContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 1287px;
  height: 520px;
  margin: 0 auto;

  border-radius: 20px;
  box-shadow: 10px 10px 4px 0px rgba(0, 0, 0, 0.5);
`

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  margin-bottom: 40px;

  border-radius: 50%;
  object-fit: cover;
`

const Name = styled.div`
  margin-bottom: 100px;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
`

const Email = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
`

const Label = styled.div`
  margin-right: 20px;
  color: ${theme.colors.grayParagraph};
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
`

const Content = styled.div`
  color: ${theme.colors.grayParagraph};
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
`

const WithdrawButton = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;

  width: 70px;
  height: 30px;
  border-radius: 12px;
  border: none;
  background-color: ${theme.colors.primaryColor50};

  color: ${theme.colors.grayParagraph};
  font-family: "Pretendard";
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`
