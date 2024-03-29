import { rest } from "msw"
import { BASE_URL } from "../../config"
import auth from "./../data/auth.json"

export const authHandler = [
  // 로그인
  rest.post(`${BASE_URL}/accounts/auth/login`, async (req, res, ctx) => {
    const user = auth
    return await res(ctx.json(user))
  }),

  // 회원탈퇴
  rest.delete(`${BASE_URL}/auth/withdraw`, async (req, res, ctx) => {
    const response = { check: false }
    return await res(ctx.json(401), ctx.json(response))
  }),
]
