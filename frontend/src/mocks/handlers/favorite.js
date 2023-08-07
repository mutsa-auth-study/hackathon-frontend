import { rest } from "msw"
import { BASE_URL } from "../../config"
import favorite from "../data/favorite.json"

export const favoriteHandler = [
  // 내 즐겨찾기 목록 조회
  rest.get(`${BASE_URL}/favorite`, async (req, res, ctx) => {
    const response = favorite
    return await res(ctx.json(response))
  }),
]
