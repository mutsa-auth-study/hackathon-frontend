import React from "react"
import { styled } from "styled-components"
import useFetch from "../../hooks/useFetch"
import ExamList from "../eachitem/examList"

function RecentlyInquire(props) {
  const { data, loading, error } = useFetch("/recently")

  return (
    <RecentlyInquireContainer>
      {data &&
        data.map(recently => (
          <ExamList key={recently.exam_id} eachExam={recently} />
        ))}
    </RecentlyInquireContainer>
  )
}

export default RecentlyInquire

const RecentlyInquireContainer = styled.div`
  width: 1287px;
  margin: 0 auto;
`
