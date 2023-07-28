import { rest } from "msw"
import { BASE_URL } from "../../config"

export const tempHandlers = [
  rest.get(`${BASE_URL}/hello`, async (req, res, ctx) => {
    const response = "hello"
    return await res(ctx.json(response))
  }),
]
