const baseUrl = 'http://localhost:3000/'

export const getRequest = (body: any, endpoint: string) => {
  return fetch(baseUrl + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export const postRequest = (body: any, endpoint: string) => {
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
