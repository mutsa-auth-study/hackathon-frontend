import React from "react"
import ReactDOM from "react-dom/client"
import GlobalStyle from "./styles/GlobalStyle"
import { ThemeProvider } from "styled-components"
import theme from "./styles/Theme"
import { RecoilRoot } from "recoil"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </>,
)
