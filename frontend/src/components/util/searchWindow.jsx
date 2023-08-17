import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import useInput from "../../hooks/useInput"
import { useSetRecoilState } from "recoil"
import search from "../../store/atom/search"

function SearchWindow(props) {
  const [keyword, setKeyword] = useInput("")
  const setSearch = useSetRecoilState(search)

  const searchLocation = () => {
    setSearch(keyword.trim())
  }

  return (
    <Container>
      <Input value={keyword} onChange={setKeyword} />
      <Button onClick={searchLocation}>
        <Icon icon={faMagnifyingGlass} />
      </Button>
    </Container>
  )
}

export default SearchWindow

const Container = styled.div`
  display: flex;
  width: 540px;
  height: 60px;

  border-radius: 8px;
  border: 1px solid ${theme.colors.grayBorder};
`

const Input = styled.input`
  width: 100%;
  margin: 16px;
  font-family: "Pretendard";
  font-weight: 300;
  font-size: ${theme.fontSizes.search};

  border: none;
  outline: none;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 59px;
  border-radius: 0px 8px 8px 0px;
  border: none;
  background-color: ${theme.colors.primaryColor};

  &:hover {
    cursor: pointer;
  }
`

const Icon = styled(FontAwesomeIcon)`
  color: ${theme.colors.white};
  font-size: 26px;
`
