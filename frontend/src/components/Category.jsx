import React, { useState } from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"

function Category(props) {
  return <CategoryContainer></CategoryContainer>
}

export default Category

const CategoryContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`
