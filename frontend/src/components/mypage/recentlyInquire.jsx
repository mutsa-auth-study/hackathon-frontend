import React, { useRef } from "react"
import { styled } from "styled-components"
import ExamList from "../eachitem/examList"
import useModalList from "../../hooks/useModalList"
import { currentRecentlyIndex, recently } from "./../../store/atom/recently"
import { recentlyModal } from "./../../store/selector/recentlyModal"
import ExamDetail from "../popup/examDetail"
import Loading from "../util/loading"
import theme from "../../styles/Theme"
import { NotExistRecentlyList } from "../../constants/ErrorMessage"
import { useRecoilValue } from "recoil"
import { user } from "../../store/atom/user"
import useSSPagination from "./../../hooks/useSSPagination"
import { PAGESIZE } from "../../constants/PageSize"

function RecentlyInquire() {
  const userinfo = useRecoilValue(user)

  const { curPageItem, renderSSPagination, loading, error } = useSSPagination(
    "/exam/recent",
    { user_id: userinfo.user_id },
    PAGESIZE,
  )

  const { dataList, currentIndex } = useModalList(
    recently,
    recentlyModal,
    currentRecentlyIndex,
    curPageItem,
  )

  const detailModalRef = useRef(null)

  return (
    <RecentlyInquireContainer>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Error>{NotExistRecentlyList}</Error>
      ) : (
        <>
          {dataList &&
            dataList.map(recently => (
              <ExamList
                key={recently.exam_id}
                eachExam={recently}
                indexAtom={currentRecentlyIndex}
              />
            ))}
          {renderSSPagination()}
          <ViewModal
            ref={detailModalRef}
            view={typeof currentIndex === "string" ? 1 : 0}
          >
            {dataList &&
              dataList.map(
                (item, index) =>
                  item.modalOpen && (
                    <ExamDetail
                      key={`detail_recently${index}`}
                      exam={item}
                      indexAtom={currentRecentlyIndex}
                    />
                  ),
              )}
          </ViewModal>
        </>
      )}
    </RecentlyInquireContainer>
  )
}

export default RecentlyInquire

const RecentlyInquireContainer = styled.div`
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
