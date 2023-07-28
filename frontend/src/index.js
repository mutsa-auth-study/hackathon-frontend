import React from "react"
import ReactDOM from "react-dom/client"
import GlobalStyle from "./styles/GlobalStyle"
import { ThemeProvider } from "styled-components"
import theme from "./styles/Theme"
import { RecoilRoot } from "recoil"
import App from "./App"
import { worker } from "./mocks/browsers"

// msw 실행을 위해
// 실제 백엔드 서버를 연결할 때 지워주면 됩니다.
if (process.env.NODE_ENV === "development") {
  worker.start()
}

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
