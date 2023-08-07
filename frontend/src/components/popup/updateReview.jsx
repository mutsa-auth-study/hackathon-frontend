import React, { useRef } from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import useCloseModal from "./../../hooks/useCloseModal"
import { useResetRecoilState } from "recoil"
import { currentReviewIndex } from "../../store/atom/review"
import StarRating from "../starRating"

function UpdateReview(props) {
  const closeModalFunc = useResetRecoilState(currentReviewIndex)
  const modalRef = useRef(null)

  useCloseModal(modalRef, closeModalFunc)

  return (
    <UpdateReviewContainer ref={modalRef}>
      <Header>
        <HeaderTitle>리뷰 작성하기</HeaderTitle>
        <CloseButton icon={faXmark} onClick={closeModalFunc} />
      </Header>
      <ReviewContent>
        <StarRating scale="noise" />
        <StarRating scale="cleanness" />
        <StarRating scale="accessibility" />
        <StarRating scale="facility" />
      </ReviewContent>
      <TextArea placeholder="내용을 입력하세요" />
      <Footer>
        <UpdateButton>수정하기</UpdateButton>
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
