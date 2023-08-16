import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"

// 버튼에 체크기능을 추가
function CategoryBox(props) {
  const onClick = () => {
    props.onChange(!props.checked)
  }
  return (
    <CategoryButton
      id={props.name}
      name={props.name}
      checked={props.checked}
      onClick={onClick}
    >
      #{props.name}
    </CategoryButton>
  )
}
export default CategoryBox

const CategoryButton = styled.button`
  float: left;
  margin: 5px;
  padding: 20px;

  border-radius: 10px;
  border: none;
  background-color: ${props =>
    props.checked ? theme.colors.primaryColor : theme.colors.primaryColor50};

  color: ${props =>
    props.checked ? theme.colors.primaryColor50 : theme.colors.primaryColor};
  font-family: "Pretendard";
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`
