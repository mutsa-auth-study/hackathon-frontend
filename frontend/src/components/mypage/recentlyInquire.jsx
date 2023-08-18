import React, { useEffect, useRef, useState } from "react"
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
import useFetch from "../../hooks/useFetch"

function RecentlyInquire() {
  const userinfo = useRecoilValue(user)

  const { data, loading, error } = useFetch(
    "/exam/recent",
    { user_id: userinfo.id },
    {
      Authorization: `Bearer ${userinfo.accessToken}`,
    },
  )

  const [myRecent, setMyRecent] = useState([])

  useEffect(() => {
    if (data) {
      setMyRecent(data.information)
    }
  }, [data])

  const { dataList, currentIndex } = useModalList(
    recently,
    recentlyModal,
    currentRecentlyIndex,
    myRecent,
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
          {dataList.length > 0 &&
            dataList.map(recently => (
              <ExamList
                key={recently.exam_id}
                eachExam={recently}
                indexAtom={currentRecentlyIndex}
              />
            ))}
          <ViewModal
            ref={detailModalRef}
            view={typeof currentIndex === "string" ? 1 : 0}
          >
            {dataList.length > 0 &&
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
