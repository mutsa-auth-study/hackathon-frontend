import { ColorRing } from "react-loader-spinner"
import styled from "styled-components"
import theme from "../../styles/Theme"

function LoadingInModal() {
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

export default LoadingInModal

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.7);
  z-index: 999;
`
