// 시험 정보를 받아서 일정캘린더 이벤트로 변환해주는 함수
import moment from "moment"

function getCalendarEvents(examInfo) {
  return examInfo
    .map((exam, index) => [
      {
        title: exam.jmfldnm,
        start: moment(exam.docRegStartDt).format("YYYY-MM-DD"),
        end: moment(exam.docRegEndDt).add(1, "d").format("YYYY-MM-DD"),
        prioirty: index + 1,
        withinday: false,
      },
      {
        title: exam.jmfldnm,
        start: moment(exam.docExamStartDt).format("YYYY-MM-DD"),
        end: moment(exam.docExamStartDt).format("YYYY-MM-DD"),
        prioirty: index + 1,
        withinday: true,
      },
      {
        title: exam.jmfldnm,
        start: moment(exam.pracRegStartDt).format("YYYY-MM-DD"),
        end: moment(exam.pracRegEndDt).add(1, "d").format("YYYY-MM-DD"),
        prioirty: index + 1,
        withinday: false,
      },
      {
        title: exam.jmfldnm,
        start: moment(exam.pracExamStartDt).format("YYYY-MM-DD"),
        end: moment(exam.pracExamStartDt).format("YYYY-MM-DD"),
        prioirty: index + 1,
        withinday: true,
      },
    ])
    .flat()
}

export default getCalendarEvents
