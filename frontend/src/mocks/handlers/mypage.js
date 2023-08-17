import { rest } from "msw"
import { BASE_URL } from "../../config"
import write from "./../data/write.json"

export const mypageHandler = [
  // 댓글 조회
  rest.get(`${BASE_URL}/mypage/comment`, async (req, res, ctx) => {
    const response = write
    return await res(ctx.json(response))
  }),

  // 댓글 추가 (내 파트는 아님...)
  rest.post(`${BASE_URL}/location/comment`, async (req, res, ctx) => {
    const response = { check: true }
    return await res(ctx.json(response))
  }),

  // 댓글 삭제
  rest.delete(`${BASE_URL}/location/comment`, async (req, res, ctx) => {
    const response = { check: true }
    return await res(ctx.json(response))
  }),

  // 댓글 수정
  rest.patch(`${BASE_URL}/location/comment`, async (req, res, ctx) => {
    const response = { check: true }
    return await res(ctx.json(response))
  }),
]
