import React, { useState } from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { useRecoilValue } from "recoil"
import StarRatingScale from "../starRatingScale"
import useInput from "./../../hooks/useInput"
import { request } from "../../utils/axios"
import { user } from "../../store/atom/user"
import useConfirm from "../../hooks/useConfirm"
import { ConfirmMessage } from "../../constants/ConfirmMessage"
import { useParams } from "react-router-dom"

//리뷰 작성
const scaleEnum = {
  noise: "noise",
  cleanness: "cleanness",
  accessibility: "accessibility",
  facility: "facility",
}

function WriteReview() {
  const userinfo = useRecoilValue(user)
  const { location_id } = useParams()

  const [currentReview, setCurrentReview] = useState({
    noise: 0,
    cleanness: 0,
    accessibility: 0,
    facility: 0,
    content: "",
  })

  const [content, setContent] = useInput("")

  const starOnChange = (scale, value) => {
    setCurrentReview(prev => {
      return {
        ...prev,
        [scaleEnum[scale]]: value,
      }
    })
  }

  const contentOnChange = event => {
    setContent(event)
    setCurrentReview(prev => {
      return {
        ...prev,
        content: event.target.value,
      }
    })
  }

  const confirmGrant = async reviewData => {
    const body = {
      user_id: userinfo.id,
      location_id: location_id,
      content: currentReview.content,
      noise: currentReview.noise,
      cleanness: currentReview.cleanness,
      accessibility: currentReview.accessibility,
      facility: currentReview.facility,
    }

    try {
      const response = await request("post", "/location/comment/", body, {
        Authorization: `Bearer ${userinfo.accessToken}`,
      })
      console.log(response)
      if (response.status === 200) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const handleConfirm = useConfirm(
    ConfirmMessage.writeReview,
    confirmGrant,
    null,
    true,
  )

  return (
    <WriteReviewContainer>
      <Header>
        <HeaderTitle>리뷰 작성하기</HeaderTitle>
      </Header>
      <ReviewContent>
        <StarRatingScale
          scale="noise"
          edit={true}
          value={currentReview.noise}
          isHalf={false}
          onChange={starOnChange}
        />
        <br />
        <StarRatingScale
          scale="cleanness"
          edit={true}
          value={currentReview.cleanness}
          isHalf={false}
          onChange={starOnChange}
        />
        <br />
        <StarRatingScale
          scale="accessibility"
          edit={true}
          value={currentReview.accessibility}
          isHalf={false}
          onChange={starOnChange}
        />
        <br />
        <StarRatingScale
          scale="facility"
          edit={true}
          value={currentReview.facility}
          isHalf={false}
          onChange={starOnChange}
        />
      </ReviewContent>
      <TextArea
        value={content}
        onChange={contentOnChange}
        placeholder="내용을 입력하세요"
      />
      <Footer>
        <UpdateButton onClick={handleConfirm}>올리기</UpdateButton>
      </Footer>
    </WriteReviewContainer>
  )
}

export default WriteReview

const WriteReviewContainer = styled.div`
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
