import { styled } from "styled-components"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import "../styles/sweetalert2.css"

/*
  useAlert
  message: confirm, alert 화면에서 보여줄 메시지 객체, constants directory에 존재
  needRefresh: refresh가 필요한 경우 : boolean default = false (없어도 된다.)
  isServerError: 서버에러로 refresh가 되면 안 되는 경우 : boolean default = false (없어도 된다.)
*/
function useAlert(needRefresh = false) {
  const alert = (message, isServerError = false) => {
    const Alert = withReactContent(Swal)

    Alert.fire({
      title: <div>{message.title}</div>,
      html: <AlertBody>{message.body}</AlertBody>,
      confirmButtonColor: "#2090FF",
      confirmButtonText: <ConfirmText>{`닫기`}</ConfirmText>,
      customClass: {
        container: "alert",
        popup: "alert-popup",
        title: "alert-title",
        htmlContainer: "alert-body",
        actions: "alert-buttonContainer",
        confirmButton: "alert-confirm-button",
      },
    }).then(res => {
      if (needRefresh && !isServerError) {
        window.location.reload()
      }
    })
  }

  return alert
}

export default useAlert

const AlertBody = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;

  padding: 16px;
  text-align: start;
  white-space: pre-line;
`

const ConfirmText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  color: white;
`
