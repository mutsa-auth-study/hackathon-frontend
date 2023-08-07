import React from "react"
import { styled } from "styled-components"
import useFetch from "./../../hooks/useFetch"
import ExamList from "../eachitem/examList"

function Favorites(props) {
  const { data, loading, error } = useFetch("/favorite")

  return (
    <FavoritesContainer>
      {data &&
        data.map(favorite => (
          <ExamList key={favorite.exam_id} eachExam={favorite} />
        ))}
    </FavoritesContainer>
  )
}

export default Favorites

const FavoritesContainer = styled.div`
  width: 1287px;
  margin: 0 auto;
`
