import KakaoLogin from "react-kakao-login"
import { request } from "./../../utils/axios"
import { styled } from "styled-components"
import { useSetRecoilState } from "recoil"
import { user } from "./../../store/atom/user"

function Kakao() {
  const kakaoClientId = process.env.REACT_APP_KAKAO_SDK_KEY

  const setUser = useSetRecoilState(user)

  const kakaoOnSuccess = async data => {
    const token = data.response.access_token

    const response = await request("post", "/auth/login", undefined, {
      Authorization: `Bearer ${token}`,
    })

    // 로그인 결과를 리코일에 저장 및 로컬스토리지에 저장
    setUser(response)
    window.location.reload()
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
