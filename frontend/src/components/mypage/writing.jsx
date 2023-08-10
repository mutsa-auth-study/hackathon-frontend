import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import useFetch from "../../hooks/useFetch"
import WriteList from "../eachitem/writeList"
import { currentReviewIndex, review } from "../../store/atom/review"
import { reviewModal } from "../../store/selector/reviewModal"
import UpdateReview from "../popup/updateReview"
import useCSPagination from "../../hooks/useCSPagination"
import useModalList from "../../hooks/useModalList"

function Writing(props) {
  const { data, loading, error } = useFetch("/mypage/comment")

  const [reviewDataList, setReviewDataList] = useState([]) // 전체 정보
  const { curPageItem, renderCSPagination } = useCSPagination(reviewDataList, 1)

  useEffect(() => {
    if (data) {
      setReviewDataList(data.information)
    }
  }, [data])

  const { dataList, currentIndex } = useModalList(
    review,
    reviewModal,
    currentReviewIndex,
    curPageItem,
  )

  const updateModalRef = useRef(null)

  return (
    <WritingContainer>
      {dataList.length > 0 &&
        dataList.map(write => (
          <WriteList key={write.location_comment_id} eachWrite={write} />
        ))}
      {renderCSPagination()}
      <ViewModal
        ref={updateModalRef}
        view={typeof currentIndex === "string" ? 1 : 0}
      >
        {dataList.map(
          (item, index) =>
            item.modalOpen && <UpdateReview key={`update_${index}`} />,
        )}
      </ViewModal>
    </WritingContainer>
  )
}

export default Writing

const WritingContainer = styled.div`
  width: 1287px;
  margin: 0 auto;
`

const ViewModal = styled.div`
  display: ${props => (props.view ? "block" : "none")};
  position: fixed;

  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`
