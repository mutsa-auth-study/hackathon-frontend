import { rest } from "msw"
import { BASE_URL } from "../../config"
import recently from "../data/recently.json"

export const recentlyHandler = [
  // 내 최근조회 목록 조회
  rest.get(`${BASE_URL}/recently`, async (req, res, ctx) => {
    const response = recently
    return await res(ctx.json(response))
  }),
]
