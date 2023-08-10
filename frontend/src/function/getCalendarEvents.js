// 시험 정보를 받아서 일정캘린더 이벤트로 변환해주는 함수
function getCalendarEvents(examInfo) {
  return examInfo
    .map((exam, index) => [
      {
        title: exam.qualgbnm,
        start: exam.docRegStartDt,
        end: exam.docRegEndDt,
        prioirty: index + 1,
        withinday: false,
      },
      {
        title: exam.qualgbnm,
        start: exam.docExamStartDt,
        end: exam.docExamEndDt,
        prioirty: index + 1,
        withinday: true,
      },
      {
        title: exam.qualgbnm,
        start: exam.pracRegStartDt,
        end: exam.pracRegEndDt,
        prioirty: index + 1,
        withinday: false,
      },
      {
        title: exam.qualgbnm,
        start: exam.pracExamStartDt,
        end: exam.pracExamEndDt,
        prioirty: index + 1,
        withinday: true,
      },
    ])
    .flat()
}

export default getCalendarEvents
