import { rest } from "msw"
import { BASE_URL } from "../../config"
import temp from "../data/temp.json"

export const tempHandlers = [
  rest.get(`${BASE_URL}/temp`, async (req, res, ctx) => {
    const response = temp
    return await res(ctx.json(response))
  }),
]
