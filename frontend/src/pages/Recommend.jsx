import React from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Header from "../components/header/header"

function Recommend(props) {
  return (
    <RecommendContainer>
      <Header />
    </RecommendContainer>
  )
}

export default Recommend

const RecommendContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`
