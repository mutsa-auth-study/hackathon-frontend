import { selector } from "recoil"
import tab from "../atom/tab"
import { TabContent } from "../../constants/TabContent"

const tabContent = selector({
  key: "tabContent",

  get: ({ get }) => {
    const tabIndex = get(tab)
    return TabContent[tabIndex]
  },
})

export default tabContent
