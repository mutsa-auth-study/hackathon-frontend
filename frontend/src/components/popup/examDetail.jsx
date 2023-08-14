import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useRecoilValue, useResetRecoilState } from "recoil"
import useCloseModal from "../../hooks/useCloseModal"
import { useEffect, useRef, useState } from "react"
import { request } from "../../utils/axios"
import { user } from "../../store/atom/user"

function ExamDetail({ exam, indexAtom }) {
  const [detail, setDetail] = useState(null)
  const closeModalFunc = useResetRecoilState(indexAtom)
  const user_id = useRecoilValue(user).user_id

  const setCloseModal = () => {
    closeModalFunc()
  }

  const modalRef = useRef(null)
  useCloseModal(modalRef, setCloseModal)

  const getExamDetail = async () => {
    try {
      const response = await request("post", `/exam/${exam.exam_id}`, {
        qualgbCd: exam.qualgbCd,
        jmCd: exam.jmCd,
        user_id,
        exam_id: exam.exam_id,
      })
      setDetail(response.information)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getExamDetail()
  }, [])

  // 아직 모달 창 내 세부 내용이 작성되지 않아.. 일단 대기...
  useEffect(() => {
    console.log(detail)
  }, [detail])

  return (
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
