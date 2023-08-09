import React, { useRef } from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import useCloseModal from "./../../hooks/useCloseModal"
import { useRecoilState, useResetRecoilState } from "recoil"
import { currentReviewIndex } from "../../store/atom/review"
import StarRatingScale from "../starRatingScale"
import useInput from "./../../hooks/useInput"
import { curReview } from "../../store/selector/reviewModal"
import { request } from "../../utils/axios"

const scaleEnum = {
  noise: "noise",
  cleanness: "cleanness",
  accessibility: "accessibility",
  facility: "facility",
}

function UpdateReview(props) {
  const closeModalFunc = useResetRecoilState(currentReviewIndex)

  // 수정 중간에 끄는 경우 현재 상태가 저장이 되면 안 되기 때문에, 페이지를 리로드하여
  // 서버에서 다시 받아오도록 변경
  const setCloseModal = () => {
    closeModalFunc()
    window.location.reload()
  }

  const [currentReview, setCurrentReview] = useRecoilState(curReview)

  const [content, setContent] = useInput(currentReview.content)
  const modalRef = useRef(null)

  useCloseModal(modalRef, setCloseModal)

  // 별점을 수정할 때 실행된다.
  const starOnChange = (scale, value) => {
    setCurrentReview(prev => {
      return {
        ...prev,
        [scaleEnum[scale]]: value,
      }
    })
  }

  // 댓글을 수정할 때 실행된다.
  // 수정될 때마다 리코일에서 처리해줘야해서 비효율적일 수도 있지만... 나중에 리팩토링
  const contentOnChange = event => {
    setContent(event)
    setCurrentReview(prev => {
      return {
        ...prev,
        content: event.target.value,
      }
    })
  }

  const updateReview = async () => {
    const body = {
      user_id: currentReview.user_id,
      location_id: currentReview.location_id,
      content: currentReview.content,
      noise: currentReview.noise,
      cleanness: currentReview.cleanness,
      accessibility: currentReview.accessibility,
      facility: currentReview.facility,
    }
    try {
      const response = await request("patch", `/location/comment`, body)
      console.log(response)
      setCloseModal() // 새로고침 함으로써 서버에서 다시 값을 불러오도록 한다.
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UpdateReviewContainer ref={modalRef}>
      <Header>
        <HeaderTitle>리뷰 수정하기</HeaderTitle>
        <CloseButton icon={faXmark} onClick={setCloseModal} />
      </Header>
      <ReviewContent>
        <StarRatingScale
          scale="noise"
          edit={true}
          value={currentReview.noise}
          onChange={starOnChange}
        />
        <StarRatingScale
          scale="cleanness"
          edit={true}
          value={currentReview.cleanness}
          onChange={starOnChange}
        />
        <StarRatingScale
          scale="accessibility"
          edit={true}
          value={currentReview.accessibility}
          onChange={starOnChange}
        />
        <StarRatingScale
          scale="facility"
          edit={true}
          value={currentReview.facility}
          onChange={starOnChange}
        />
      </ReviewContent>
      <TextArea
        value={content}
        onChange={contentOnChange}
        placeholder="내용을 입력하세요"
      />
      <Footer>
        <UpdateButton onClick={updateReview}>수정하기</UpdateButton>
      </Footer>
    </UpdateReviewContainer>
  )
}

export default UpdateReview

const UpdateReviewContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  width: 677px;

  background-color: ${theme.colors.white};
  border-radius: 20px;
  border: 1px solid ${theme.colors.black};
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 16px;

  border-bottom: 1px solid ${theme.colors.black};
`

const HeaderTitle = styled.div`
  font-size: ${theme.fontSizes.modalTitle};
  font-family: "Pretendard";
  font-weight: 600;
`

const CloseButton = styled(FontAwesomeIcon)`
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`

const ReviewContent = styled.section`
  width: 100%;
  height: 340px;
  padding: 65px 45px;
  border-bottom: 1px solid ${theme.colors.black};
`

const TextArea = styled.textarea`
  width: 100%;
  height: 350px;
  padding: 16px;
  resize: none;
  outline: none;
  border: none;

  font-family: "Pretendard";
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 300;
`

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 16px;
  border-top: 1px solid ${theme.colors.black};
`

const UpdateButton = styled.button`
  width: 90px;
  height: 30px;
  background-color: ${theme.colors.primaryColor};
  border-radius: 4px;
  border: none;
  color: ${theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`
