import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

// useModalList
// 아이템이 여러 개이고 그 상황에서 각각 모달을 띄워야 할 때 사용

// parameter
// dataAtom: 데이터 아톰, modalSelector: 데이터를 모달 확장시킨 셀렉터
// indexAtom: 현재 인덱스 아톰, curPageItem: 현재 페이지 아이템

// return value
// dataList: 현재 페이지 아이템 (모달 확장된 selector value)
// currentIndex: 현재 선택 인덱스
function useModalList(dataAtom, modalSelector, indexAtom, curPageItem) {
  const [data, setData] = useRecoilState(dataAtom)
  const [dataList, setDataList] = useRecoilState(modalSelector)
  const currentIndex = useRecoilValue(indexAtom)

  const resetData = useResetRecoilState(dataAtom)

  useEffect(() => {
    setData(curPageItem)
    setDataList(data)

    return () => {
      resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPageItem])

  return {
    dataList,
    currentIndex,
  }
}

export default useModalList
