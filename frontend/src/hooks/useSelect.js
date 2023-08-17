import { useCallback, useState } from "react"

// useSelect
// 드롭다운을 관리해주는 기능을 수행
// parameter: initialValue 초기 값
// return: value 현재 선택 값, onChange: 변화시키는 함수
function useSelect(initialValue) {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback(event => {
    setValue(event.target.value)
  }, [])

  return [value, onChange]
}

export default useSelect
