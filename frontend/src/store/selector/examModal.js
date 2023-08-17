import { selector } from "recoil"
import { currentExamIndex, exam } from "../atom/exam"

export const examModal = selector({
  key: "examModal",

  get: ({ get }) => {
    const examList = get(exam)
    const selectedIndex = get(currentExamIndex)

    return examList.map(exam => {
      return {
        ...exam,
        modalOpen: exam.exam_id === selectedIndex,
      }
    })
  },

  set: ({ set, get }, newValue) => {
    set(currentExamIndex, newValue)
  },
})
