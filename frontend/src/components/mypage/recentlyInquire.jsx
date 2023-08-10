import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import useFetch from "../../hooks/useFetch"
import ExamList from "../eachitem/examList"
import useCSPagination from "../../hooks/useCSPagination"
import useModalList from "../../hooks/useModalList"
import { currentRecentlyIndex, recently } from "./../../store/atom/recently"
import { recentlyModal } from "./../../store/selector/recentlyModal"
import ExamDetail from "../popup/examDetail"

function RecentlyInquire(props) {
  const { data, loading, error } = useFetch("/exam/recent")

  const [recentlyDataList, setRecentlyDataList] = useState([]) // 전체 정보
  const { curPageItem, renderCSPagination } = useCSPagination(
    recentlyDataList,
    1,
  )

  useEffect(() => {
    if (data) {
      setRecentlyDataList(data.information)
    }
  }, [data])

  const { dataList, currentIndex } = useModalList(
    recently,
    recentlyModal,
    currentRecentlyIndex,
    curPageItem,
  )

  useEffect(() => {
    console.log(dataList)
  }, [dataList])

  const detailModalRef = useRef(null)

  return (
    <RecentlyInquireContainer>
      {dataList &&
        dataList.map(recently => (
          <ExamList
            key={recently.exam_id}
            eachExam={recently}
            indexAtom={currentRecentlyIndex}
          />
        ))}
      {renderCSPagination()}
      <ViewModal
        ref={detailModalRef}
        view={typeof currentIndex === "string" ? 1 : 0}
      >
        {dataList.map(
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
    </RecentlyInquireContainer>
  )
}

export default RecentlyInquire

const RecentlyInquireContainer = styled.div`
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
