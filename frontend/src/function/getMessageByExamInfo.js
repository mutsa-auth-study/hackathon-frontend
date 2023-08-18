import moment from "moment"

function getMessageByExamInfo(imminentInfo, index, profile_nickname) {
  const today = moment()

  const dueDateCalculator = end => {
    const dueDate = moment(end).diff(today, "days") + 1

    if (dueDate < 0) {
      return `D+${Math.abs(dueDate)}`
    } else {
      return `D-${dueDate}`
    }
  }

  if (imminentInfo.name === "docRegEndDt") {
    return {
      title: profile_nickname
        ? `${profile_nickname}님이 즐겨찾기한 시험\n
        제 ${imminentInfo.implSeq}회 ${
          imminentInfo.jmfldnm
        } 원서접수 마감 ${dueDateCalculator(imminentInfo.end)}`
        : `가장 많이 조회한 시험 Top ${index + 1}\n
            제 ${imminentInfo.implSeq}회 ${
              imminentInfo.jmfldnm
            } 원서접수 마감 ${dueDateCalculator(imminentInfo.end)}`,
      desc: `원서 접수 기간: ${moment(imminentInfo.start).format(
        "YYYY-MM-DD",
      )} ~ ${moment(imminentInfo.end).format("YYYY-MM-DD")}\n
            수험생 여러분, 잊지 말고 접수하세요!`,
    }
  } else if (imminentInfo.name === "docExamEndDt") {
    return {
      title: profile_nickname
        ? `${profile_nickname}님이 즐겨찾기한 시험\n
        제 ${imminentInfo.implSeq}회 ${
          imminentInfo.jmfldnm
        } 필기 시험 ${dueDateCalculator(imminentInfo.end)}`
        : `가장 많이 조회한 시험 Top ${index + 1}\n
            제 ${imminentInfo.implSeq}회 ${
              imminentInfo.jmfldnm
            } 필기 시험 ${dueDateCalculator(imminentInfo.end)}`,
      desc: `필기 시험 날짜: ${moment(imminentInfo.start).format(
        "YYYY-MM-DD",
      )}\n
      수험생 여러분, 시험 잘 보세요:)`,
    }
  } else if (imminentInfo.name === "docPassDt") {
    return {
      title: profile_nickname
        ? `${profile_nickname}님이 즐겨찾기한 시험\n
        제 ${imminentInfo.implSeq}회 ${
          imminentInfo.jmfldnm
        } 필기 시험 합격자 발표 ${dueDateCalculator(imminentInfo.end)}`
        : `가장 많이 조회한 시험 Top ${index + 1}\n
            제 ${imminentInfo.implSeq}회 ${
              imminentInfo.jmfldnm
            } 필기 시험 합격자 발표 ${dueDateCalculator(imminentInfo.end)}`,
      desc: `필기 시험 합격자 발표일: ${moment(imminentInfo.start).format(
        "YYYY-MM-DD",
      )}\n
        수험생 여러분, 모두 합격하셨길 바래요:)`,
    }
  } else if (imminentInfo.name === "pracRegEndDt") {
    return {
      title: profile_nickname
        ? `${profile_nickname}님이 즐겨찾기한 시험\n
        제 ${imminentInfo.implSeq}회 ${
          imminentInfo.jmfldnm
        } 원서접수 마감 ${dueDateCalculator(imminentInfo.end)}`
        : `가장 많이 조회한 시험 Top ${index + 1}\n
            제 ${imminentInfo.implSeq}회 ${
              imminentInfo.jmfldnm
            } 원서접수 마감 ${dueDateCalculator(imminentInfo.end)}`,
      desc: `원서 접수 기간: ${moment(imminentInfo.start).format(
        "YYYY-MM-DD",
      )} ~ ${moment(imminentInfo.end).format("YYYY-MM-DD")}\n
            수험생 여러분, 잊지 말고 접수하세요!`,
    }
  } else if (imminentInfo.name === "pracExamEndDt") {
    return {
      title: profile_nickname
        ? `${profile_nickname}님이 즐겨찾기한 시험\n
        제 ${imminentInfo.implSeq}회 ${
          imminentInfo.jmfldnm
        } 실기 시험 ${dueDateCalculator(imminentInfo.end)}`
        : `가장 많이 조회한 시험 Top ${index + 1}\n
            제 ${imminentInfo.implSeq}회 ${
              imminentInfo.jmfldnm
            } 실기 시험 ${dueDateCalculator(imminentInfo.end)}`,
      desc: `실기 시험 날짜: ${moment(imminentInfo.start).format(
        "YYYY-MM-DD",
      )}\n
      수험생 여러분, 시험 잘 보세요:)`,
    }
  } else if (imminentInfo.name === "pracPassDt") {
    return {
      title: profile_nickname
        ? `${profile_nickname}님이 즐겨찾기한 시험\n
        제 ${imminentInfo.implSeq}회 ${
          imminentInfo.jmfldnm
        } 실기 시험 합격자 발표 ${dueDateCalculator(imminentInfo.end)}`
        : `가장 많이 조회한 시험 Top ${index + 1}\n
            제 ${imminentInfo.implSeq}회 ${
              imminentInfo.jmfldnm
            } 실기 시험 합격자 발표 ${dueDateCalculator(imminentInfo.end)}`,
      desc: `실기 시험 합격자 발표일: ${moment(imminentInfo.start).format(
        "YYYY-MM-DD",
      )}\n
        수험생 여러분, 모두 합격하셨길 바래요:)`,
    }
  }
}

export default getMessageByExamInfo
