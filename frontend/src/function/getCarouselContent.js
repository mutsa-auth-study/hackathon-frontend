import moment from "moment"
import getMessageByExamInfo from "./getMessageByExamInfo"

// 시험 정보를 받아서 캐러샐 내용으로 변환해주는 함수
function getCarouselContent(examInfo, profile_nickname) {
  const today = moment()

  // 임박한 시험정보를 계산
  function getImminentInfo(exam) {
    // 필기접수마감, 필기시험종료, 필기합격자, 실기접수마감, 실기시험종료, 실기합격자
    const examInfo = [
      {
        implSeq: exam.implSeq,
        jmfldnm: exam.jmfldnm,
        name: "docRegEndDt",
        start: exam.docRegStartDt,
        end: exam.docRegEndDt,
      },
      {
        implSeq: exam.implSeq,
        jmfldnm: exam.jmfldnm,
        name: "docExamEndDt",
        start: exam.docExamStartDt,
        end: exam.docExamEndDt,
      },
      {
        implSeq: exam.implSeq,
        jmfldnm: exam.jmfldnm,
        name: "docPassDt",
        start: exam.docPassDt,
        end: exam.docPassDt,
      },
      {
        implSeq: exam.implSeq,
        jmfldnm: exam.jmfldnm,
        name: "pracRegEndDt",
        start: exam.pracRegStartDt,
        end: exam.pracRegEndDt,
      },
      {
        implSeq: exam.implSeq,
        jmfldnm: exam.jmfldnm,
        name: "pracExamEndDt",
        start: exam.pracExamStartDt,
        end: exam.pracExamEndDt,
      },
      {
        implSeq: exam.implSeq,
        jmfldnm: exam.jmfldnm,
        name: "pracPassDt",
        start: exam.pracPassDt,
        end: exam.pracPassDt,
      },
    ]

    let curInfo = null

    for (const info of examInfo) {
      if (today.isSameOrAfter(moment(info.end)) || info.end === null) {
        curInfo = info
      } else {
        curInfo = info
        break
      }
    }

    return curInfo
  }

  return examInfo.map((exam, index) => {
    const imminentInfo = getImminentInfo(exam)
    return getMessageByExamInfo(imminentInfo, index, profile_nickname)
  })
}

export default getCarouselContent
