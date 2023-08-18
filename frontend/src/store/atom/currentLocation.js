import { atom } from "recoil"
import localStorageEffect from "../localStorageEffect"

export const currentLocation = atom({
  key: "currentLocation",
  default: {},
  effects: [localStorageEffect("currentLocation")],
})

export const currentLocationIndex = atom({
  key: "currentLocationIndex",
  default: -1,
})
