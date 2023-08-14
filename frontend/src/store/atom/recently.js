import { atom } from "recoil"

export const recently = atom({
  key: "recently",
  default: [],
})

export const currentRecentlyIndex = atom({
  key: "currentRecentlyIndex",
  default: undefined,
})
