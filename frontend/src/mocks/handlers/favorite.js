import { rest } from "msw"
import { BASE_URL } from "../../config"
import favorite from "../data/favorite.json"

export const favoriteHandler = [
  // 내 즐겨찾기 목록 조회
  rest.get(`${BASE_URL}/exam/favorite`, async (req, res, ctx) => {
    const response = favorite

    // 3초 후 응답 보내기
    await new Promise(resolve => setTimeout(resolve, 3000))

    return await res(ctx.status(401), ctx.json(response))
  }),

  // 즐겨찾기 추가
  rest.post(`${BASE_URL}/exam/favorite`, async (req, res, ctx) => {
    const body = await req.json()
    const response = { check: true, information: { exam_id: body.exam_id } }
    return await res(ctx.json(response))
  }),

  // 즐겨찾기 제거
  rest.delete(`${BASE_URL}/exam/favorite`, async (req, res, ctx) => {
    const body = await req.json()
    const response = { check: true, information: { exam_id: body.exam_id } }
    return await res(ctx.json(response))
  }),
]
