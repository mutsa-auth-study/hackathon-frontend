import React from "react"
import { styled } from "styled-components"
import theme from "../../styles/Theme"
import { TabContent } from "../../constants/TabContent"
import { useRecoilState } from "recoil"
import tab from "../../store/atom/tab"

function Tab() {
  const [tabIndex, setTabIndex] = useRecoilState(tab)

  return (
    <TabContainer>
      {TabContent.map((tab, index) => (
        <TabItem
          key={`tab${index}`}
          onClick={() => setTabIndex(index)}
          accent={index === tabIndex ? 1 : 0}
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
