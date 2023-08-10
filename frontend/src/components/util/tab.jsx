import React, { useEffect } from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import useTab from "../../hooks/useTab"
import { TabContent } from "../../constants/TabContent"
import { useSetRecoilState } from "recoil"
import tab from "../../store/atom/tab"

function Tab() {
  const { currentIndex, currentTab, changeTab } = useTab(0, TabContent)
  const setTab = useSetRecoilState(tab)

  useEffect(() => {
    setTab(currentTab)
  }, [currentTab, setTab])

  return (
    <TabContainer>
      {TabContent.map((tab, index) => (
        <TabItem
          key={`tab${index}`}
          onClick={() => changeTab(index)}
          accent={index === currentIndex ? 1 : 0}
        >
          {tab.name}
        </TabItem>
      ))}
    </TabContainer>
  )
}

export default Tab

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 80px;
  margin: 200px auto;
`

const TabItem = styled.div`
  display: inline;
  padding: 10px 16px 50px 16px;
  border-bottom: 2px solid
    ${props =>
      props.accent ? theme.colors.primaryColor : theme.colors.grayBorder};

  color: ${props =>
    props.accent ? theme.colors.primaryColor : theme.colors.grayBorder};
  font-family: "Pretendard";
  font-weight: 600;
  font-size: ${theme.fontSizes.tab};

  &:hover {
    cursor: pointer;
  }
`
