import { atom } from "recoil"
import localStorageEffect from "../localStorageEffect"

const tab = atom({
  key: "tab",
  default: 0,
  effects: [localStorageEffect("tab")],
})

export default tab
