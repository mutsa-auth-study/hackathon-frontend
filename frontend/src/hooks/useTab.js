import { useCallback, useState } from "react"

// useTab
// 탭을 관리해줄 수 있는 기능
// parameter: initialTab: 처음 탭, allTabs: 탭 배열
// return: currentTab: 현재 탭, changeTab: 탭 변경 함수
function useTab(initialTab, allTabs) {
  const [currentIndex, setCurrentIndex] = useState(initialTab)

  const currentTab = allTabs[currentIndex]
  const changeTab = useCallback(index => {
    setCurrentIndex(index)
  }, [])

  return {
    currentTab,
    changeTab,
  }
}

export default useTab
