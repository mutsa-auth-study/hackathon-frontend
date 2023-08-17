import { atom } from "recoil"

export const review = atom({
  key: "review",
  default: [],
})

export const currentReviewIndex = atom({
  key: "currentReviewIndex",
  default: undefined,
})
