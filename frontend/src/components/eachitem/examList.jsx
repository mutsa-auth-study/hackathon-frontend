import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

function ExamList({ eachExam }) {
  return (
    <ExamListContainer>
      <ExamName>{eachExam.exam_name}</ExamName>
      <Desc>
        <Agency>{eachExam.exam_agency}</Agency>
        <Tagname>{eachExam.tag}</Tagname>
        <Star icon={faStar} />
      </Desc>
    </ExamListContainer>
  )
}

export default ExamList

const ExamListContainer = styled.div`
  width: 100%;
  height: 130px;
  margin: 0 auto;
  margin-bottom: 40px;
`

const ExamName = styled.div`
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 600;
`

const Desc = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  height: 70px;
  margin-top: 30px;
`

const Agency = styled.div`
  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.examdesc};
  font-weight: 300;
`

const Tagname = styled.div`
  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.examdesc};
  font-weight: 300;
`

const Star = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: ${theme.fontSizes.paragraph};

  &:hover {
    cursor: pointer;
  }
`
