import React, { useState } from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { reviewModal } from "../../store/selector/reviewModal"
import { request } from "../../utils/axios"
import moment from "moment/moment"
import ShowMoreText from "../util/showMoreText"
import DetailStarRating from "./detailStarRating"
import { user } from "../../store/atom/user"
import useConfirm from "../../hooks/useConfirm"
import { ConfirmMessage } from "../../constants/ConfirmMessage"
import StarRatingScale from "../starRatingScale"

function WriteList({ eachWrite }) {
  const userinfo = useRecoilValue(user)
  const setIndex = useSetRecoilState(reviewModal)

  const [expanded, setExpanded] = useState(false)

  const moreButtonClick = isExpanded => {
    setExpanded(isExpanded)
  }

  const starClick = () => {
    setExpanded(!expanded)
  }

  // 리뷰 삭제
  const confirmGrant = async () => {
    try {
      const response = await request(
        "delete",
        `/location/comment/${eachWrite.location_comment_id}`,
        null,
        {
          Authorization: `Bearer ${userinfo.accessToken}`,
        },
      )
      if (response.status === 200) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  const deleteReview = useConfirm(
    ConfirmMessage.deleteReview,
    confirmGrant,
    null,
    true,
  )

  return (
    <WriteListContainer>
      <UserId>{`${eachWrite.email}`}</UserId>
      <StarRatingContainer onClick={starClick}>
        <StarRatingScale
          scale="average"
          edit={false}
          value={eachWrite.average}
        />
        <DetailStarRating
          expanded={expanded}
          noise={eachWrite.noise}
          cleanness={eachWrite.cleanness}
          accessibility={eachWrite.accessibility}
          facility={eachWrite.facility}
        />
      </StarRatingContainer>
      <Content>
        <ShowMoreText
          onMoreClick={moreButtonClick}
          content={eachWrite.content}
          expanded={expanded}
          size={430}
        />
      </Content>
      <CreatedAt>{moment(eachWrite.created_at).format("YYYY-MM-DD")}</CreatedAt>
      <ButtonContainer>
        <UpdateButton onClick={() => setIndex(eachWrite.location_comment_id)}>
          수정
        </UpdateButton>
        {` / `}
        <DeleteButton onClick={deleteReview}>삭제</DeleteButton>
      </ButtonContainer>
    </WriteListContainer>
  )
}

export default WriteList

const WriteListContainer = styled.div`
  position: relative;
  width: 670px;
  min-height: 250px;
  margin: 0 auto;

  margin-bottom: 30px;
  padding: 30px;

  border-radius: 20px;
  border: 1px solid ${theme.colors.black};
`

const UserId = styled.div`
  margin-bottom: 15px;
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 300;
`

const Content = styled.div`
  width: 430px;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.paragraph};
  line-height: 125%;
`

const StarRatingContainer = styled.div`
  position: relative;
  width: 70%;
  margin-bottom: 30px;
`

const CreatedAt = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;

  color: ${theme.colors.grayDesc};
  font-size: ${theme.fontSizes.writedesc};
  font-family: "Pretendard";
  font-weight: 300;
`

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  right: 30px;

  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.writedesc};
`

const UpdateButton = styled.button`
  width: 40px;
  height: 20px;

  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`

const DeleteButton = styled.button`
  width: 40px;
  height: 20px;

  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`
