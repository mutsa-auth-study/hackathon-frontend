import React from "react"
import styled from "styled-components"
import theme from "../styles/Theme"

import { starRatingScale } from "../constants/starRatingScale"
import StarRating from "./starRating/starRating"

//리뷰 개수까지 보여주는 컴포넌트 제작

function StarRatingScaleCount(props) {
  const { scale, edit, value, onChange, reviewCount } = props

  const scaleOnChange = newRating => {
    onChange(scale, newRating)
  }

  return (
    <StarRatingContainer>
      <StarRating
        edit={edit}
        value={value}
        onChange={scaleOnChange}
        reviewCount={reviewCount}
      />
      <Scale>
        {`${starRatingScale[scale]} (`}
        <CurrentRate>{value.toFixed(1)}</CurrentRate>
        {` / 5.0)`}
        {` (${reviewCount} 리뷰)`}
      </Scale>
    </StarRatingContainer>
  )
}
export default StarRatingScaleCount

const StarRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Scale = styled.div`
  width: 250px;
  padding-top: 10px;
  font-size: ${theme.fontSizes.paragraph};
  font-family: "Pretendard";
  font-weight: 300;
`

const CurrentRate = styled.span`
  font-size: ${theme.fontSizes.paragraph};
  font-family: "Pretendard";
  font-weight: 300;
`
