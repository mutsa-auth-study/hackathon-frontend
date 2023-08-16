import { useEffect, useState } from "react"

// useCategory
// 카테고리를 관리하는 커스텀 훅 (기존 useCheckbox 변형)
// parameter: initialList name, 체크여부의 객체 배열 {name: ~~, isChecked: false}
// return: checkboxList: 체크박스 리스트
// setCategoryList: 체크박스 관리 등록을 위해
// checkAll: 체크박스가 모두 선택됐는지에 대한 값 (boolean)
// checkAllHandler: 체크박스를 모두 선택하는 것을 관리하는 함수 (function)
// checkHandler: 체크박스 각각 하나를 관리
function useCategory(initialList) {
  const [categoryList, setCategoryList] = useState(initialList)
  const [checkAll, setCheckAll] = useState(false) // 전체 체크 여부

  // 전체 선택 기능
  const checkAllHandler = checked => {
    setCategoryList(
      categoryList.map(checkbox => ({ ...checkbox, isChecked: checked })),
    )
    setCheckAll(checked)
  }

  // 체크를 했을 때 실행되는 함수
  const checkHandler = (name, checked) => {
    const updatedList = categoryList.map(item =>
      item.name === name ? { ...item, isChecked: checked } : item,
    )
    setCategoryList(updatedList)
    checkSelectAll(updatedList)
  }

  // 전체 선택 체크 여부 확인
  const checkSelectAll = list => {
    const allChecked = list.every(item => item.isChecked)
    setCheckAll(allChecked)
  }

  useEffect(() => {
    checkSelectAll(categoryList)
  }, [categoryList])

  return {
    categoryList,
    setCategoryList,
    checkAll,
    checkAllHandler,
    checkHandler,
  }
}

export default useCategory
