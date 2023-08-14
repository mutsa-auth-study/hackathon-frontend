import React, { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import useFetch from "./../../hooks/useFetch"
import ExamList from "../eachitem/examList"
import useCSPagination from "../../hooks/useCSPagination"
import useModalList from "../../hooks/useModalList"
import { currentFavoriteIndex, favorite } from "./../../store/atom/favorite"
import { favoriteModal } from "./../../store/selector/favoriteModal"
import ExamDetail from "../popup/examDetail"
import Loading from "./../util/loading"
import theme from "../../styles/Theme"
import { NotExistFavoriteList } from "../../constants/ErrorMessage"
import { useRecoilValue } from "recoil"
import { user } from "../../store/atom/user"

function Favorites() {
  const userinfo = useRecoilValue(user)
  const { data, loading, error } = useFetch(
    "/exam/favorite",
    { user_id: userinfo.user_id },
    {
      Authorization: `Bearer ${userinfo.accessToken}`,
    },
  )

  const [myFavorites, setMyFavorites] = useState([]) // 전체 정보
  const { curPageItem, renderCSPagination } = useCSPagination(myFavorites, 1)

  useEffect(() => {
    getExamDetail()
  }, [])

  // 아직 모달 창 내 세부 내용이 작성되지 않아.. 일단 대기...
  useEffect(() => {
    console.log(detail)
  }, [detail])

  const { dataList, currentIndex } = useModalList(
    favorite,
    favoriteModal,
    currentFavoriteIndex,
    curPageItem,
  )

  const detailModalRef = useRef(null)

  return (
<<<<<<< HEAD
    <ExamDetailContainer ref={modalRef}>
      <Header>
        <HeaderTitle>{exam.jmfldnm} 시험 상세 정보 보기</HeaderTitle>
        <CloseButton icon={faXmark} onClick={setCloseModal} />
      </Header>
      <Section>
        <Info>접수 시작일: </Info>
        <Info>접수 마감일: </Info>
        <Info>응시료: </Info>
        <Info>접수 사이트 바로가기: </Info>
      </Section>
    </ExamDetailContainer>
=======
    <FavoritesContainer>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <Error>{NotExistFavoriteList}</Error>
      ) : (
        <>
          {dataList.length > 0 &&
            dataList.map(favorite => (
              <ExamList
                key={favorite.exam_id}
                eachExam={favorite}
                indexAtom={currentFavoriteIndex}
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
                    key={`detail_favorite${index}`}
                    exam={item}
                    indexAtom={currentFavoriteIndex}
                  />
                ),
            )}
          </ViewModal>
        </>
      )}
    </FavoritesContainer>
>>>>>>> develop
  )
}

export default ExamDetail

// 너무 가로, 세로가 커요..... 사이즈 조절 필요해보입니다.
const ExamDetailContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  width: 1200px;
  height: 700px;

  background-color: ${theme.colors.white};
  border-radius: 12px 12px 0px 0px;

  border: 1px solid ${theme.colors.grayBorder};
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 110px;
  padding: 16px;

  border-radius: 12px 12px 0px 0px;
  background-color: ${theme.colors.primaryColor};
`

const HeaderTitle = styled.div`
  color: ${theme.colors.white};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.examDetail};
  font-weight: 600;
`

const CloseButton = styled(FontAwesomeIcon)`
  color: ${theme.colors.white};
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }
`

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 80px;
`

const Info = styled.div`
  display: flex;

  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.examDetail};
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
