import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as faStarFill } from "@fortawesome/free-solid-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { request } from "../../utils/axios"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { user } from "../../store/atom/user"
import useConfirm from "../../hooks/useConfirm"
import { ConfirmMessage } from "../../constants/ConfirmMessage"

function ExamList({ eachExam, indexAtom }) {
  const userinfo = useRecoilValue(user)
  const setIndex = useSetRecoilState(indexAtom)

  // 즐겨찾기 삭제
  const deleteConfirmGrant = async () => {
    try {
      const response = await request(
        "delete",
        "/exam/favorite",
        {
          user_id: userinfo.user_id,
          exam_id: eachExam.exam_id,
        },
        {
          Authorization: `Bearer ${userinfo.accessToken}`,
        },
      )
      return response.check
    } catch (error) {
      return false
    }
  }

  // 즐겨찾기 추가
  const addConfirmGrant = async () => {
    try {
      const response = await request(
        "post",
        "/exam/favorite",
        {
          user_id: userinfo.user_id,
          exam_id: eachExam.exam_id,
        },
        {
          Authorization: `Bearer ${userinfo.accessToken}`,
        },
      )
      return response.check
    } catch (error) {
      return false
    }
  }

  const addFavoirte = useConfirm(
    ConfirmMessage.addFavorite,
    addConfirmGrant,
    null,
    true,
  )
  const deleteFavoirte = useConfirm(
    ConfirmMessage.deleteFavorite,
    deleteConfirmGrant,
    null,
    true,
  )

  const updateFavoirte = is_favorite => {
    is_favorite ? deleteFavoirte() : addFavoirte()
  }

  return (
    <ExamListContainer>
      <ExamName onClick={() => setIndex(eachExam.exam_id)}>
        {eachExam.jmfldnm}
      </ExamName>
      <Desc>
        <Agency>{eachExam.seriesnm}</Agency>
        <Tagname>{eachExam.obligfldnm}</Tagname>
        <Star
          icon={eachExam.is_favorite ? faStarFill : faStar}
          onClick={() => updateFavoirte(eachExam.is_favorite)}
        />
      </Desc>
    </ExamListContainer>
  )
}

export default ExamList

const ExamListContainer = styled.div`
  width: 100%;
  height: 130px;
  margin: 0 auto;
  margin-bottom: 40px;
`

const ExamName = styled.div`
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.paragraph};
  font-weight: 600;
  &:hover {
    color: ${theme.colors.primaryColor};
    cursor: pointer;
  }
`

const Desc = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  height: 70px;
  margin-top: 30px;
`

const Agency = styled.div`
  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.examdesc};
  font-weight: 300;
`

const Tagname = styled.div`
  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.examdesc};
  font-weight: 300;
`

const Star = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: ${theme.fontSizes.paragraph};

  &:hover {
    cursor: pointer;
  }
`
