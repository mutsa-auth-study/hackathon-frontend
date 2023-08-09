import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import useFetch from "../../hooks/useFetch"
import WriteList from "../eachitem/writeList"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { currentReviewIndex, review } from "../../store/atom/review"
import { reviewModal } from "../../store/selector/reviewModal"
import UpdateReview from "../popup/updateReview"
import useCSPagination from "../../hooks/useCSPagination"

function Writing(props) {
  const { data, loading, error } = useFetch("/mypage/comment")

  const [reviewDataList, setReviewDataList] = useState([]) // 전체 정보
  const { curPageItem, renderCSPagination } = useCSPagination(reviewDataList, 1)

  const [reviewData, setReviewData] = useRecoilState(review) // 리뷰 데이터 (현재 페이지)
  const [reviewList, setReviewList] = useRecoilState(reviewModal) // 리뷰 리스트 (모달, 현재 페이지)
  const currentIndex = useRecoilValue(currentReviewIndex) // 모달 백드롭

  const resetData = useResetRecoilState(review) // 상태 초기화

  useEffect(() => {
    if (data) {
      setReviewDataList(data.information)
    }
  }, [data])

  // 페이지가 변동될 때마다 리코일에 새로운 페이지 정보로 교체
  useEffect(() => {
    setReviewData(curPageItem)
    setReviewList(reviewData)

    return () => {
      resetData()
    }
  }, [curPageItem, resetData, reviewData, setReviewData, setReviewList])

  const updateModalRef = useRef(null)

  return (
    <WritingContainer>
      {reviewList.length > 0 &&
        reviewList.map(write => (
          <WriteList key={write.location_comment_id} eachWrite={write} />
        ))}
      {renderCSPagination()}
      <ViewModal
        ref={updateModalRef}
        view={typeof currentIndex === "string" ? 1 : 0}
      >
        {reviewList.map(
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
