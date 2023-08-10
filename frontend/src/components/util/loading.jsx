import { ColorRing } from "react-loader-spinner"
import styled from "styled-components"
import theme from "../../styles/Theme"

function Loading() {
  return (
    <LoadingContainer>
      <ColorRing
        visible={true}
        height="200"
        width="200"
        colors={[
          theme.colors.secondaryColor,
          theme.colors.secondaryColor500,
          theme.colors.secondaryColor300,
          theme.colors.secondaryColor200,
          theme.colors.secondaryColor100,
        ]}
      />
    </LoadingContainer>
  )
}

export default Loading

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
`
