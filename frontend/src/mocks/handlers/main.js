import { rest } from "msw"
import { BASE_URL } from "../../config"
import popular from "./../data/popular.json"

export const mainHandler = [
  // 인기 시험 조회
  rest.get(`${BASE_URL}/main`, async (req, res, ctx) => {
    const response = popular
    return await res(ctx.json(response))
  }),
]
