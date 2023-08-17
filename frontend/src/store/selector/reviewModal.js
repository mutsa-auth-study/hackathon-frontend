import { selector } from "recoil"
import { currentReviewIndex, review } from "../atom/review"

export const reviewModal = selector({
  key: "reviewModal",

  get: ({ get }) => {
    const reviewList = get(review)
    const selectedIndex = get(currentReviewIndex)

    return reviewList.map(review => {
      return {
        ...review,
        modalOpen: review.location_comment_id === selectedIndex,
      }
    })
  },

  set: ({ set, get }, newValue) => {
    set(currentReviewIndex, newValue)
  },
})

// 현재 인덱스의 글만 관리하기 위해
export const curReview = selector({
  key: "curReview",

  get: ({ get }) => {
    const reviewList = get(review)
    const selectedIndex = get(currentReviewIndex)

    const currentReview = reviewList.find(
      review => review.location_comment_id === selectedIndex,
    )

    return currentReview
  },

  set: ({ set, get }, newValue) => {
    let reviewList = get(reviewModal)
    const selectedIndex = get(currentReviewIndex)

    reviewList = reviewList.map(review => {
      if (review.location_comment_id === selectedIndex) {
        return newValue
      } else {
        return review
      }
    })

    set(review, reviewList)
  },
})
