import React from "react"
import styled from "styled-components"
import theme from "../styles/Theme"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { starRatingScale } from "./../constants/starRatingScale"

function StarRating(props) {
  return (
    <StarRatingContainer>
      <StarConatiner>
        <Star icon={faStar} />
        <Star icon={faStar} />
        <Star icon={faStar} />
        <Star icon={faStar} />
        <Star icon={faStar} />
      </StarConatiner>
      <Scale>
        {`${starRatingScale[props.scale]} (`}
        <CurrentRate>{5.0}</CurrentRate>
        {` / 5.0)`}
      </Scale>
    </StarRatingContainer>
  )
}

export default StarRating

const StarRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StarConatiner = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 30px;
`

const Star = styled(FontAwesomeIcon)`
  margin-right: 8px;
  font-size: ${theme.fontSizes.paragraph};
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
