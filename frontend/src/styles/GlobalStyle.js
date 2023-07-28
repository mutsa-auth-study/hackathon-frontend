import { createGlobalStyle } from "styled-components"
import { reset } from "styled-reset"

import Pretendard_SemiBold from "./fonts/Pretendard/Pretendard-SemiBold.woff2"
import Pretendard_Light from "./fonts/Pretendard/Pretendard-Light.woff2"

const GlobalStyle = createGlobalStyle`
    ${reset}

    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard SemiBold'),
        url(${Pretendard_SemiBold}) format('woff2');
        font-weight: 600;
    }

    @font-face {
        font-family: 'Pretendard';
        src: local('Pretendard Light'),
        url(${Pretendard_Light}) format('woff2');
        font-weight: 300;
    }

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }
`

export default GlobalStyle
