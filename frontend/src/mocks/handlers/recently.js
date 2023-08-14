import { rest } from "msw"
import { BASE_URL } from "../../config"
import recentlyPage from "./../data/recently/recently"

export const recentlyHandler = [
  // 내 최근조회 목록 조회
  rest.get(`${BASE_URL}/exam/recent`, async (req, res, ctx) => {
    const searchParams = new URLSearchParams(req.url.search) // 수정된 부분
    const page = searchParams.get("page")
    const limit = searchParams.get("limit")
    console.log(page, limit)
    const response = recentlyPage(page)
    await new Promise(resolve => setTimeout(resolve, 500))

    return await res(ctx.json(response))
  }),
]
