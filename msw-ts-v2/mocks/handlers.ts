import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/greeting', ({ request, params, cookies }) => {
    return HttpResponse.json({ greeting: 'hello there 🕵️' })
  })
]
