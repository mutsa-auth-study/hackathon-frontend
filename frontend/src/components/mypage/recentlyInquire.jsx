import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import useFetch from "../../hooks/useFetch"
import ExamList from "../eachitem/examList"
import useCSPagination from "../../hooks/useCSPagination"

function RecentlyInquire(props) {
  const { data, loading, error } = useFetch("/exam/recent")

  const [recentlyList, setRecentlyList] = useState([])
  const { curPageItem, renderCSPagination } = useCSPagination(recentlyList, 1)

  useEffect(() => {
    if (data) {
      setRecentlyList(data.information)
    }
  }, [data])

  return (
    <RecentlyInquireContainer>
      {curPageItem &&
        curPageItem.map(recently => (
          <ExamList key={recently.exam_id} eachExam={recently} />
        ))}
      {renderCSPagination()}
    </RecentlyInquireContainer>
  )
}

export default RecentlyInquire

const RecentlyInquireContainer = styled.div`
  width: 1287px;
  margin: 0 auto;
`
