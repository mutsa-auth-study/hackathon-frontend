import React, { useState } from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import StarRating from "./../starRating/starRating"
import moment from "moment/moment"
import ShowMoreText from "../util/showMoreText"
import DetailStarRating from "./detailStarRating"
import StarRatingScale from "../starRatingScale"

function ReviewList({ eachWrite }) {
  const [expanded, setExpanded] = useState(false)

  const moreButtonClick = isExpanded => {
    setExpanded(isExpanded)
  }

  const starClick = () => {
    setExpanded(!expanded)
  }

  // 이메일 앞 3자만 보이게 하는 함수
  function maskEmail(email) {
    if (email === undefined) return ""

    const atIndex = email.indexOf("@")

    const username = email.slice(0, atIndex)
    const domain = email.slice(atIndex + 1)

    const visibleEmail = username.slice(0, 3)
    const maskedEmail = visibleEmail + "*".repeat(username.length - 3)

    return maskedEmail + "@" + domain
  }

  return (
    <ReviewListContainer>
      <UserId>{`${maskEmail(eachWrite.email)}`}</UserId>
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
    </ReviewListContainer>
  )
}

export default ReviewList

const ReviewListContainer = styled.div`
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
