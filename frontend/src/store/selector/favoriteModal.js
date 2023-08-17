import { selector } from "recoil"
import { currentFavoriteIndex, favorite } from "../atom/favorite"

export const favoriteModal = selector({
  key: "favoriteModal",

  get: ({ get }) => {
    const favoriteList = get(favorite)
    const selectedIndex = get(currentFavoriteIndex)

    return favoriteList.map(favorite => {
      return {
        ...favorite,
        modalOpen: favorite.exam_id === selectedIndex,
      }
    })
  },

  set: ({ set, get }, newValue) => {
    set(currentFavoriteIndex, newValue)
  },
})
