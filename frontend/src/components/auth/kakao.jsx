import KakaoLogin from "react-kakao-login"
import { request } from "./../../utils/axios"
import { styled } from "styled-components"

function Kakao() {
  const kakaoClientId = process.env.REACT_APP_KAKAO_LOGIN_API_KEY

  const kakaoOnSuccess = async data => {
    const token = data.response.access_token

    const response = await request("post", "/api/kakao/callback", undefined, {
      Authorization: `Bearer ${token}`,
    })

    console.log(response)
  }

  const kakaoOnFailure = error => {
    console.log(error)
  }

  return (
    <KakaoLogin
      token={kakaoClientId}
      onSuccess={kakaoOnSuccess}
      onFail={kakaoOnFailure}
      render={({ onClick }) => (
        <KaKaoLoginImage
          onClick={event => {
            event.preventDefault()
            onClick()
          }}
        />
      )}
    />
  )
}

export default Kakao

const KaKaoLoginImage = styled.div`
  width: 184px;
  height: 47px;
  background-image: url("/img/kakao_login.png");
  background-repeat: no-repeat;

  object-fit: none;
  &:hover {
    cursor: pointer;
  }
`
