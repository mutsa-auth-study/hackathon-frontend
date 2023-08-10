// 시험 정보를 받아서 캐러샐 내용으로 변환해주는 함수
function getCarouselContent(examInfo, profile_nickname) {
  if (!profile_nickname) {
    return examInfo.map((exam, index) => ({
      title: `가장 많이 조회한 시험 Top ${index + 1}\n
              제 ${exam.implSeq}회 ${exam.qualgbnm} 원서접수 마감 D-${3}`,
      desc: `원서 접수 기간: ${exam.docRegStartDt} ~ ${exam.docRegEndDt}\n
              수험생 여러분, 잊지 말고 접수하세요!`,
    }))
  } else {
    return examInfo.map(exam => ({
      title: `${profile_nickname}님이 즐겨찾기한 시험\n
                제 ${exam.implSeq}회 ${exam.qualgbnm} 원서접수 마감 D-${3}`,
      desc: `원서 접수 기간: ${exam.docRegStartDt} ~ ${exam.docRegEndDt}\n
                수험생 여러분, 잊지 말고 접수하세요!`,
    }))
  }
}

export default getCarouselContent
