import React from "react"
import { styled } from "styled-components"

function CarouselNoEvent(props) {
  return (
    <CarouselContainer>
      <Content>즐겨찾기를 먼저 등록하세요.</Content>
    </CarouselContainer>
  )
}

export default CarouselNoEvent

const CarouselContainer = styled.div`
  position: relative;
  height: 400px;
  background-color: #d9d9d9;
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px 55px;
  border-radius: 20px;
`
