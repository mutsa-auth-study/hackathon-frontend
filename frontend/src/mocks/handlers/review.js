import { rest } from "msw"
import { BASE_URL } from "../../config"
import review from "../data/review.json"

export const reviewHandler = [
  rest.get(`${BASE_URL}/location/comment`, async (req, res, ctx) => {
    const response = review
    return await res(ctx.json(response))
  }),
]
