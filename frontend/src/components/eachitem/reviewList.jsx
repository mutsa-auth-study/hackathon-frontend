import React, { useState } from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import StarRating from "./../starRating/starRating"
import moment from "moment/moment"
import ShowMoreText from "../util/showMoreText"
import DetailStarRating from "./detailStarRating"

function ReviewList({ eachWrite }) {
  const [expanded, setExpanded] = useState(false)

  const moreButtonClick = isExpanded => {
    setExpanded(isExpanded)
  }

  const starClick = () => {
    setExpanded(!expanded)
  }

  return (
    <ReviewListContainer>
      <UserId>{`jinokim98`}</UserId>
      <StarRatingContainer onClick={starClick}>
        <StarRating edit={false} value={eachWrite.average} />
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
  width: 50%;
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
