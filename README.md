# 개발환경 설명

## prettier 설정
+ printWidth: 한 줄의 최대 길이 80자 제한
+ tabWidth: 탭 문자의 길이를 2로 설정
+ singleQuote: 문자열을 큰 따옴표로 표시
+ trailingComma: 객체나 배열의 마지막 요소에 항상 쉼표
+ bracketSpacing: 객체 리터럴에서 괄호 주위에 공백 추가
+ semi: 문장 끝에 세미콜론 사용하지 않음
+ arrowParens: 화살표 함수에서 인자가 하나인 경우 괄호 생략
+ endOfLine: 개행 문자(End of Line)를 LF(Line Feed)로 설정합니다. Windows의 CRLF 대신 LF를 사용합니다.

## src 폴더구조 설명
+ components: 페이지에서 반복적으로 사용될 컴포넌트를 모아두는 곳
+ constants: 상수의 값을 저장해놓는 곳
+ hooks: 커스텀 훅을 모아두는 곳
+ mocks: 가짜 서버 관련해서 모아두는 곳
+ pages: 우리 서비스에서 필요한 페이지
+ store: recoil atom, selector를 모아두는 곳
+ styles: font, globaltheme, theme를 정의해둔 곳, 추가로 라이브러리를 사용하면서 직접 css파일을 건들 일이 생긴다면 이 곳에 추가해주세요
+ utils: 유용하게 사용할 수 있는 기능을 모아두는 곳
+ App.js: 우리 서비스의 앱
+ config.js: 설정을 넣어두는 곳 (나는 BASE_URL을 저장해 둠)
+ index.js: 글로벌 스타일, 테마, 리코일 루트를 index.js에 선언해둠으로써 App안에서 이들을 사용할 수 있게 설정, 가짜 서버를 위한 코드도 존재
+ Routes.jsx: 라우트 설정하는 곳

## 기타 파일 설명
+ public: index.html이 존재
  - **mockServiceWorker.js**파일은 가짜 서버를 위한 설정파일이므로 가짜 서버를 사용하지 않을 때까지는 지우지 마세요

+ .env: (깃에 올라가지 않으니 직접 설정해주세요)
    ```
    REACT_APP_SERVER_HOST="http://localhost:8080"
    REACT_APP_CLIENT_HOST="http://localhost:3000"
    ```
+ .eslintrc: 코드 오류를 잡아주는 역할을 수행
+ .prettierrc: 코드 스타일, 컨벤션을 잡아주는 역할 수행, 내용에 대한 설명은 prettier 설정 참고
+ package.json: react에서 사용하는 라이브러리를 모아두는 곳
  - 처음에 프로젝트를 클론한 후 터미널에 npm i를 입력하면 package.json에 있는 라이브러리를 자동으로 설치

## mocks server worker
+ 가짜 서버를 만들어 백엔드가 없어도 백엔드 연결 테스트를 해볼 수 있다.
+ client에서 axios 요청을 보내면 msw가 이를 가로채 미리 작성해둔 응답을 보내준다

### msw 폴더 구조
+ data: 더미 데이터를 구축해놓는 곳, js, json 어느 것을 사용해도 상관없다.
+ handlers: 응답 메시지를 정의해놓는 곳
+ handler 작성하는 요령
```js
// get, post, patch, delete 등 http method를 정한다.
// http://localhost:8080은 BASE_URL로 대체한다.
// endpoint 별로 작성할 수 있으며, BASE_URL뒤에 /로 시작하면 된다. 요청을 보낼때도 마찬가지
// async (req, res, ctx)
// req: request
// res: response
// ctx: context

// 응답의 결과를 response 변수에 넣어 return await res(ctx.json(response)) 형식으로 돌려주면 된다.
// 각 핸들러들은 배열로 저장한다

// req의 url 파라미터, body도 여기서 받을 수 있으며, 그 내용은 구글에 검색하면 친절하게 나옵니다.
rest.get(`${BASE_URL}/hello`, async (req, res, ctx) => {
    const response = "hello"
    return await res(ctx.json(response))
  }),
```

+ 추가로 작성한 handler를 handler.js에서 스프레드 연산자로 추가해주면 된다.
+ 이렇게 작성해놓으면 특정 endpoint로 request를 보낼 때 등록한 응답이 돌아오게 된다.

## request (axios)
+ utils/axios.js를 참고

+ 요청을 보낼 때
```js
// get
const fetchData = async () => {
    try {
        const response = await request('get', '/hello')
        return response
    } catch (error) {
        console.log(error)
        throw error
}

// post
const body = {name: 'jinokim'}
const fetchData = async () => {
    try {
        const response = await request('post', '/hello', body)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
```

이와 같이 요청을 보내면 됩니다. 따로 `axios.post()` 사용하지 마세요

