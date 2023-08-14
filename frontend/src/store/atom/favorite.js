import { atom } from "recoil"

export const favorite = atom({
  key: "favorite",
  default: [],
})

export const currentFavoriteIndex = atom({
  key: "currentFavoriteIndex",
  default: undefined,
})
