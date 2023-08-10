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

function Favorites() {
  const { data, loading, error } = useFetch("/exam/favorite")

  const [myFavorites, setMyFavorites] = useState([]) // 전체 정보
  const { curPageItem, renderCSPagination } = useCSPagination(myFavorites, 1)

  useEffect(() => {
    if (data) {
      setMyFavorites(data.information)
    }
  }, [data])

  const { dataList, currentIndex } = useModalList(
    favorite,
    favoriteModal,
    currentFavoriteIndex,
    curPageItem,
  )

  const detailModalRef = useRef(null)

  return (
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
  )
}

export default Favorites

const FavoritesContainer = styled.div`
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
