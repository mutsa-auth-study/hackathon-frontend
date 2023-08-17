import React from "react"
import StarRatingScale from "../starRatingScale"
import { styled } from "styled-components"

function DetailStarRating(props) {
  const { expanded, noise, cleanness, accessibility, facility } = props
  return (
    <DetailStarRatingContainer expanded={expanded ? 1 : 0}>
      <StarRatingScale scale="noise" edit={false} value={noise} />
      <StarRatingScale scale="cleanness" edit={false} value={cleanness} />
      <StarRatingScale
        scale="accessibility"
        edit={false}
        value={accessibility}
      />
      <StarRatingScale scale="facility" edit={false} value={facility} />
    </DetailStarRatingContainer>
  )
}

export default DetailStarRating

const DetailStarRatingContainer = styled.div`
  display: ${props => (props.expanded ? "block" : "none")};
  width: 140%;
  margin-top: 10px;
`
