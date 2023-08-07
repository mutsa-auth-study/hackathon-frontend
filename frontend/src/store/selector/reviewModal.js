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
