import { selector } from "recoil"
import { currentRecentlyIndex, recently } from "../atom/recently"

export const recentlyModal = selector({
  key: "recentlyModal",

  get: ({ get }) => {
    const recentlyList = get(recently)
    const selectedIndex = get(currentRecentlyIndex)

    if (recentlyList === undefined) return

    return recentlyList.map(recently => {
      return {
        ...recently,
        modalOpen: recently.exam_id === selectedIndex,
      }
    })
  },

  set: ({ set, get }, newValue) => {
    set(currentRecentlyIndex, newValue)
  },
})
