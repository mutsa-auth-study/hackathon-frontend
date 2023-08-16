import { rest } from "msw"
import { BASE_URL } from "../../config"
import exam from "../data/exam.json"

export const examHandler = [
  rest.get(`${BASE_URL}/exam`, async (req, res, ctx) => {
    const response = exam
    return await res(ctx.json(response))
  }),
]
