import { selector } from "recoil"
import { currentSearchListIndex, searchlist } from "../atom/searchlist"

export const searchlistModal = selector({
  key: "searchlistModal",

  get: ({ get }) => {
    const SearchList = get(searchlist)
    const selectedIndex = get(currentSearchListIndex)

    return SearchList.map(searchlist => {
      return {
        ...searchlist,
        modalOpen: searchlist.exam_id === selectedIndex,
      }
    })
  },

  set: ({ set, get }, newValue) => {
    set(currentSearchListIndex, newValue)
  },
})
