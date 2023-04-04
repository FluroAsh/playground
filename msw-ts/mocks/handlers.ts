// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ greeting: 'hello there 🕵️' }))
  })
]
