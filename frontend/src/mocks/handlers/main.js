import { rest } from "msw"
import { BASE_URL } from "../../config"
import popular from "./../data/popular.json"

export const mainHandler = [
  // 인기 시험 조회
  rest.get(`${BASE_URL}/main`, async (req, res, ctx) => {
    const response = popular
    // 0.5초 지연
    await new Promise(resolve => setTimeout(resolve, 500))
    return await res(ctx.status(401), ctx.json(response))
  }),
]
