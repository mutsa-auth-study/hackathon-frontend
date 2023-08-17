import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useRecoilValue, useResetRecoilState } from "recoil"
import useCloseModal from "../../hooks/useCloseModal"
import { useEffect, useRef, useState } from "react"
import { request } from "../../utils/axios"
import { user } from "../../store/atom/user"
import moment from "moment"
import LoadingInModal from "../util/loadingInModal"

function ExamDetail({ exam, indexAtom }) {
  const [detail, setDetail] = useState(null)
  const closeModalFunc = useResetRecoilState(indexAtom)
  const user_id = useRecoilValue(user).user_id
  const [loading, setLoading] = useState(true)

  const setCloseModal = () => {
    closeModalFunc()
  }

  const modalRef = useRef(null)
  useCloseModal(modalRef, setCloseModal)

  const formatDate = date => {
    if (date === null) return ""

    return moment(date).format("YYYY-MM-DD")
  }

  const getExamDetail = async () => {
    try {
      setLoading(true)
      const response = await request("post", `/exam/detail/${exam.exam_id}/`, {
        qualgbCd: exam.qualgbCd,
        jmCd: exam.jmCd,
        user_id,
        exam_id: exam.exam_id,
      })
      setDetail(response.information[0])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getExamDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ExamDetailContainer ref={modalRef}>
      <Header>
        <HeaderTitle>{exam.jmfldnm} 시험 상세 정보 보기</HeaderTitle>
        <CloseButton icon={faXmark} onClick={setCloseModal} />
      </Header>
      <Section>
        {loading ? (
          <LoadingInModal />
        ) : (
          <>
            {detail && (
              <>
                <Info>{`${detail.implYy}년 ${detail.implSeq}회차 ${exam.jmfldnm}시험 조회`}</Info>
                <Info>{`설명 : ${detail.description}`}</Info>
                <Info>{`\n`}</Info>
                <Info>{`필기 원서접수 시작 : ${formatDate(
                  detail.docRegStartDt,
                )}`}</Info>
                <Info>{`필기 원서접수 마감 : ${formatDate(
                  detail.docRegEndDt,
                )}`}</Info>
                <Info>{`필기시험 시작일자 : ${formatDate(
                  detail.docExamStartDt,
                )}`}</Info>
                <Info>{`필기시험 종료일자 : ${formatDate(
                  detail.docExamEndDt,
                )}`}</Info>
                <Info>{`필기시험 합격자 발표 : ${formatDate(
                  detail.docPassDt,
                )}`}</Info>
                <Info>{`실기 원서접수 시작 : ${formatDate(
                  detail.pracRegStartDt,
                )}`}</Info>
                <Info>{`실기 원서접수 마감 : ${formatDate(
                  detail.pracRegEndDt,
                )}`}</Info>
                <Info>{`실기시험 시작일자 : ${formatDate(
                  detail.pracExamStartDt,
                )}`}</Info>
                <Info>{`실기시험 종료일자 : ${formatDate(
                  detail.pracExamEndDt,
                )}`}</Info>
                <Info>{`실기 합격자 발표 : ${formatDate(
                  detail.pracPassDt,
                )}`}</Info>
              </>
            )}
          </>
        )}
      </Section>
    </ExamDetailContainer>
  )
}

export default ExamDetail

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
  padding: 50px 80px;

  white-space: pre-line;
`

const Info = styled.div`
  display: flex;

  margin-bottom: 10px;

  color: ${theme.colors.grayDesc};
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.examDetail};

  white-space: pre-line;
`
