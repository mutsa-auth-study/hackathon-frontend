import { rest } from "msw"
import { BASE_URL } from "../../config"
import searchlist from "../data/searchlist.json"

export const searchListHandler = [
  rest.get(`${BASE_URL}/exam/searchlist`, async (req, res, ctx) => {
    const response = searchlist
    return await res(ctx.json(response))
  }),
]
