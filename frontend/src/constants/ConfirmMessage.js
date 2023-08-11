export const ConfirmMessage = {
  withdraw: {
    title: "탈퇴하기",
    body: `탈퇴 시 회원님께서 작성한 모든 내용은 삭제됩니다.
    탈퇴하시겠습니까?`,
    confirmButton: "탈퇴하기",
    onConfirm: {
      success: {
        title: "탈퇴완료",
        body: "정상적으로 처리되었습니다",
      },
      failure: {
        title: "서버오류",
        body: "일시적인 서버오류로 요청이 거부되었습니다.",
      },
    },
  },

  // 여기에는 5개 이상 등록 시 에러 메시지도 받아야 할 수도
  addFavorite: {
    title: "즐겨찾기 추가",
    body: "정말 즐겨찾기에 추가하시겠습니까?",
    confirmButton: "추가하기",
    onConfirm: {
      success: {
        title: "추가성공",
        body: "정상적으로 처리되었습니다.",
      },
      failure: {
        title: "서버오류",
        body: "일시적인 서버오류로 요청이 거부되었습니다.",
      },
    },
  },

  deleteFavorite: {
    title: "즐겨찾기 삭제",
    body: "정말 삭제하시겠습니까?",
    confirmButton: "삭제하기",
    onConfirm: {
      success: {
        title: "삭제성공",
        body: "정상적으로 처리되었습니다.",
      },
      failure: {
        title: "서버오류",
        body: "일시적인 서버오류로 요청이 거부되었습니다.",
      },
    },
  },

  deleteReview: {
    title: "리뷰 삭제",
    body: "정말 삭제하시겠습니까?",
    confirmButton: "삭제하기",
    onConfirm: {
      success: {
        title: "삭제성공",
        body: "정상적으로 처리되었습니다.",
      },
      failure: {
        title: "서버오류",
        body: "일시적인 서버오류로 요청이 거부되었습니다.",
      },
    },
  },

  updateReview: {
    title: "리뷰 수정",
    body: "정말 수정하시겠습니까?",
    confirmButton: "수정하기",
    onConfirm: {
      success: {
        title: "수정성공",
        body: "정상적으로 처리되었습니다.",
      },
      failure: {
        title: "서버오류",
        body: "일시적인 서버오류로 요청이 거부되었습니다.",
      },
    },
  },
}