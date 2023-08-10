import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import useFetch from "./../../hooks/useFetch"
import ExamList from "../eachitem/examList"
import useCSPagination from "../../hooks/useCSPagination"

function Favorites(props) {
  const { data, loading, error } = useFetch("/exam/favorite")

  const [myFavorites, setMyFavorites] = useState([])
  const { curPageItem, renderCSPagination } = useCSPagination(myFavorites, 1)

  useEffect(() => {
    if (data) {
      setMyFavorites(data.information)
    }
  }, [data])

  return (
    <FavoritesContainer>
      {curPageItem.length > 0 &&
        curPageItem.map(favorite => (
          <ExamList key={favorite.exam_id} eachExam={favorite} />
        ))}
      {renderCSPagination()}
    </FavoritesContainer>
  )
}

export default Favorites

const FavoritesContainer = styled.div`
  width: 1287px;
  margin: 0 auto;
`
