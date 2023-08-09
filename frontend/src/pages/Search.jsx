import React from "react"
import { styled } from "styled-components"
import theme from "../styles/Theme"
import Header from "../components/header/header"

function Recommend(props) {
  return (
    <RecommendContainer>
      <Header />
      <Title>맞춤 검색</Title>
      <Serach>
        <Label>시험 과목명</Label>
        <SerachBox placeholder="시험명을 입력하세요."></SerachBox>
        <Button>
          <img
            src="/img/button.png"
            alt=""
            style={{ width: "100px", height: "100px" }}
          />
        </Button>
      </Serach>
      <Category></Category>
      <Exam></Exam>
    </RecommendContainer>
  )
}

export default Recommend

const RecommendContainer = styled.div`
  width: ${theme.componentSize.maxWidth};
`
const Title = styled.h2`
  margin: 80px 0;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
`
const Serach = styled.div`
  display: flex;
  align-items: center;
  width: ${theme.componentSize.maxWidth};
  margin: 100px;
`
const Label = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
  text-align: center;
  border: 1px solid #acb1c6;
  border-radius: 10px;
  padding: 30px;
  margin: 30px;
`
const SerachBox = styled.input`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: ${theme.fontSizes.subtitle};
  border: 1px solid #acb1c6;
  border-radius: 20px;
  width: 60vw;
  padding: 30px;
  margin: 30px;
`
const Button = styled.button`
  margin: 30px;
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`
const Category = styled.div`
  width: ${theme.componentSize.maxWidth};
`
const Exam = styled.div`
  width: ${theme.componentSize.maxWidth};
`
