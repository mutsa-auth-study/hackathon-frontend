import React, { useEffect, useRef } from "react"
import { styled } from "styled-components"
import useFetch from "../../hooks/useFetch"
import WriteList from "../eachitem/writeList"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import { currentReviewIndex, review } from "../../store/atom/review"
import { reviewModal } from "../../store/selector/reviewModal"
import UpdateReview from "../popup/updateReview"

function Writing(props) {
  const { data, loading, error } = useFetch("/mypage/write")

  const [reviewData, setReviewData] = useRecoilState(review) // 리뷰 데이터
  const [reviewList, setReviewList] = useRecoilState(reviewModal) // 리뷰 리스트 (모달)
  const currentIndex = useRecoilValue(currentReviewIndex) // 모달 백드롭

  const resetData = useResetRecoilState(review) // 상태 초기화

  useEffect(() => {
    if (data) {
      setReviewData(data)
      setReviewList(reviewData)
    }

    return () => {
      resetData()
    }
  }, [data])

  const updateModalRef = useRef(null)

  return (
    <WritingContainer>
      {reviewList.length > 0 &&
        reviewList.map(write => (
          <WriteList key={write.location_comment_id} eachWrite={write} />
        ))}
      <ViewModal
        ref={updateModalRef}
        view={typeof currentIndex === "number" ? 1 : 0}
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
