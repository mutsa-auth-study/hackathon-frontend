import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"

function Carousel(props) {
  const [index, setIndex] = useState(0)

  const background = [
    "/img/carousel1.jpg",
    "/img/carousel2.jpg",
    "/img/carousel3.jpg",
    "/img/carousel4.jpg",
    "/img/carousel5.jpg",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % props.content.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [props.content.length])

  return (
    <CarouselContainer>
      <Content image={background[index]} index={index}>
        <Title>{props.content[index].title}</Title>
        <Description>{props.content[index].desc}</Description>
      </Content>
      <Dots>
        {props.content.map((item, idx) => (
          <Dot
            key={`carousel${idx}`}
            accent={index === idx ? 1 : 0}
            onClick={() => setIndex(idx)}
          />
        ))}
      </Dots>
    </CarouselContainer>
  )
}

export default Carousel

const CarouselContainer = styled.div`
  position: relative;
  height: 400px;
  background-color: #d9d9d9;
  border-radius: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Dots = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  justify-content: center;
  align-items: center;
`

const Dot = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 10px;
  background-color: ${props =>
    props.accent ? theme.colors.black : theme.colors.white};
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px 55px;
  border-radius: 20px;

  transition: transform 0.5s ease-in-out;

  &::before {
    position: absolute;

    background-image: ${props => `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    content: "";
  }
`

const Title = styled.h2`
  font-size: ${theme.fontSizes.title};
  margin-bottom: 60px;
  line-height: 80%;
  white-space: pre-line;
`

const Description = styled.p`
  font-size: ${theme.fontSizes.subtitle};
  line-height: 110%;
  white-space: pre-line;
`
