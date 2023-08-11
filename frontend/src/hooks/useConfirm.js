import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import styled from "styled-components"
import "../styles/sweetalert2.css"
import useAlert from "./useAlert"

/*
  useConfirm
  message: confirm, alert 화면에서 보여줄 메시지 객체, constants directory에 존재
  confirmFunc: 확인을 누를 때 실행되는 함수 : function
  dismiss: 확인 창에서 취소를 누를 때 실행되는 함수 : function | null (없어도 된다.)
  needRefresh: refresh가 필요한 경우 : boolean default = false (없어도 된다.)
*/
const useConfirm = (
  message,
  confirmFunc,
  dismiss = null,
  needRefresh = false,
) => {
  const alert = useAlert(needRefresh)

  if (!confirmFunc || typeof confirmFunc !== "function") return

  const confirm = () => {
    const Confirm = withReactContent(Swal)

    Confirm.fire({
      title: <div>{message.title}</div>,
      html: <Body>{message.body}</Body>,
      showCancelButton: true,
      allowOutsideClick: false,
      showCloseButton: true,
      cancelButtonColor: "#6C757D",
      confirmButtonColor: "#2090FF",
      reverseButtons: true,
      cancelButtonText: <ConfirmText>{`닫기`}</ConfirmText>,
      confirmButtonText: (
        <ConfirmText>{`${message.confirmButton}`}</ConfirmText>
      ),
      customClass: {
        container: "confirm",
        popup: "popup",
        title: "title",
        closeButton: "closeButton",
        htmlContainer: "body",
        actions: "buttonContainer",
        confirmButton: "confirm-button",
        cancelButton: "cancel-button",
      },
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await confirmFunc()
        if (res) {
          alert(message.onConfirm.success)
        } else {
          alert(message.onConfirm.failure, true)
        }
      } else if (result.isDismissed) {
        if (dismiss === null || typeof dismiss !== "function") return
        dismiss()
      }
    })
  }
  return confirm
}

export default useConfirm

const Body = styled.div`
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
