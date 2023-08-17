import { rest } from "msw"
import { BASE_URL } from "../../config"
import location from "../data/location.json"

export const locationHandler = [
  rest.get(`${BASE_URL}/location`, async (req, res, ctx) => {
    const response = location
    return await res(ctx.json(response))
  }),
]
