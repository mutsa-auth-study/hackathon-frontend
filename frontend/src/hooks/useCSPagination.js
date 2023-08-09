import { useEffect, useState } from "react"
import { usePagination } from "react-use-pagination"
import CSPagination from "../components/util/pagination"

// useCSPagination
// 클라이언트 사이드 페이지네이션을 관리해주는 커스텀 훅

// parameter
// dataList: 전체 데이터 배열, pageSize: 한 페이지에 들어갈 아이템 수

// return value
// curPageItem: 현재 페이지 내용, renderCSPagination: 페이지네이션 버튼
function useCSPagination(dataList, pageSize) {
  const [curPageItem, setCurPageItem] = useState([]) // 현재 페이지 아이템 수

  const { currentPage, startIndex, endIndex, setPage } = usePagination({
    totalItems: dataList.length,
    initialPageSize: pageSize,
    initialPage: 0,
  })

  // 초기에는 0 ~ pageSize만큼만 제공
  useEffect(() => {
    if (dataList) {
      setCurPageItem(dataList.slice(0, pageSize))
    }
  }, [dataList, pageSize])

  // 페이지의 변동이 있을 때는 페이지에 맞추어 정보 제공
  useEffect(() => {
    setCurPageItem(dataList.slice(startIndex, endIndex + 1))
  }, [currentPage, dataList, endIndex, startIndex])

  // 페이지 변동 함수
  const onSetPage = page => {
    setPage(page - 1)
  }

  const renderCSPagination = () => {
    return (
      <CSPagination
        page={currentPage + 1}
        pageSize={pageSize}
        count={dataList.length}
        setPage={onSetPage}
      />
    )
  }

  return {
    curPageItem,
    renderCSPagination,
  }
}

export default useCSPagination
