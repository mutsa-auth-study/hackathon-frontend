import React from "react"
import styled from "styled-components"
import theme from "../styles/Theme"

import { starRatingScale } from "../constants/starRatingScale"
import StarRating from "./starRating/starRating"

function StarRatingScale(props) {
  const { scale, edit, value, onChange } = props

  const scaleOnChange = newRating => {
    onChange(scale, newRating)
  }

  return (
    <StarRatingContainer>
      <StarRating edit={edit} value={value} onChange={scaleOnChange} />
      <Scale>
        {`${starRatingScale[scale]} (`}
        <CurrentRate>{value}</CurrentRate>
        {` / 5.0)`}
      </Scale>
    </StarRatingContainer>
  )
}

export default StarRatingScale

const StarRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Scale = styled.div`
  font-size: ${theme.fontSizes.paragraph};
  font-family: "Pretendard";
  font-weight: 300;
`

const CurrentRate = styled.span`
  font-size: ${theme.fontSizes.paragraph};
  font-family: "Pretendard";
  font-weight: 300;
`
