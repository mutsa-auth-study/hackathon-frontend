import recently1 from "./recently1.json"
import recently2 from "./recently2.json"
import recently3 from "./recently3.json"
import recently4 from "./recently4.json"

function recentlyPage(page) {
  const recentlyList = [recently1, recently2, recently3, recently4]
  return recentlyList[page]
}

export default recentlyPage
