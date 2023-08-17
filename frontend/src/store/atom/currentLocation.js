import { atom } from "recoil"

export const currentLocation = atom({
  key: "currentLocation",
  default: {},
})

export const currentLocationIndex = atom({
  key: "currentLocationIndex",
  default: -1,
})
