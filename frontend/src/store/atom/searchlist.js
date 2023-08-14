import { atom } from "recoil"

export const searchlist = atom({
  key: "searchlist",
  default: [],
})

export const currentSearchListIndex = atom({
  key: "currentSearchListIndex",
  default: undefined,
})
