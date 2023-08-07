import { rest } from "msw"
import { BASE_URL } from "../../config"
import write from "./../data/write.json"

export const mypageHandler = [
  rest.get(`${BASE_URL}/mypage/write`, async (req, res, ctx) => {
    const response = write
    return await res(ctx.json(response))
  }),
]
