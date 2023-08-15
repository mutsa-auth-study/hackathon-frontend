import { atom } from "recoil"

export const exam = atom({
  key: "exam",
  default: [],
})

export const currentExamIndex = atom({
  key: "currentExamIndex",
  default: undefined,
})
