import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import useFetch from "../../hooks/useFetch"
import WriteList from "../eachitem/writeList"
import { currentReviewIndex, review } from "../../store/atom/review"
import { reviewModal } from "../../store/selector/reviewModal"
import UpdateReview from "../popup/updateReview"
import useCSPagination from "../../hooks/useCSPagination"
import useModalList from "../../hooks/useModalList"
import Loading from "../util/loading"
import { NotExistReviewList } from "../../constants/ErrorMessage"
import theme from "../../styles/Theme"
import { useRecoilValue } from "recoil"
import { user } from "../../store/atom/user"
import { PAGESIZE } from "../../constants/PageSize"

function Writing() {
  const userinfo = useRecoilValue(user)

  const { data, loading, error } = useFetch(
    "/mypage/comment",
    { user_id: userinfo.user_id },
    {
      Authorization: `Bearer ${userinfo.accessToken}`,
    },
  )

  const [reviewDataList, setReviewDataList] = useState([]) // 전체 정보
  const { curPageItem, renderCSPagination } = useCSPagination(
    reviewDataList,
    PAGESIZE,
  )

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
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Error>{NotExistReviewList}</Error>
      ) : (
        <>
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
        </>
      )}
    </WritingContainer>
  )
}

export default Writing

const WritingContainer = styled.div`
  width: 1287px;
  margin: 0 auto;
`

const Error = styled.div`
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.subtitle};
  font-weight: 600;
  line-height: 150%;

  white-space: pre-line;
  text-align: center;
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
