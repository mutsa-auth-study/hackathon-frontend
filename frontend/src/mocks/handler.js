import { locationHandler } from "./handlers/location"
import { favoriteHandler } from "./handlers/favorite"
import { recentlyHandler } from "./handlers/recently"
import { mypageHandler } from "./handlers/mypage"

// 핸들러를 추가해서 스프레드 연산자로 추가해주면 됩니다.
export const handlers = [
  ...locationHandler,
  ...favoriteHandler,
  ...recentlyHandler,
  ...mypageHandler,
]
