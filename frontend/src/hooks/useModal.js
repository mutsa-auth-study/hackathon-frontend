import { useEffect, useState } from "react"

// useModal
// 모달 창을 띄워주는 커스텀 훅, ref 외부를 클릭하면 꺼진다.
// parameter: 모달 창의 ref
// return: modalOpen (모달 창 오픈 상태)
function useModal(modalRef) {
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        modalRef.current == null ||
        !modalRef.current.contains(event.target)
      ) {
        setModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    modalRef.current?.addEventListener("click", () => setModalOpen(true))
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      modalRef.current?.removeEventListener("click", () => setModalOpen(true))
    }
  }, [modalRef])

  return modalOpen
}

export default useModal
