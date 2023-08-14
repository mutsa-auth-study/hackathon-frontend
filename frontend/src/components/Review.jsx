import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import { useRecoilValue } from "recoil"
import { currentLocation } from "../store/atom/currentLocation"

function Review() {
  const selectedLocation = useRecoilValue(currentLocation)
  return (
    <ReviewContainer>
      <Title>고사장 리뷰 보기</Title>
    </ReviewContainer>
  )
}

export default Review

const ReviewContainer = styled.div`
  width: 1287px;
  margin: 0 auto;
`

const Title = styled.div`
  margin: 80px 0;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
`
