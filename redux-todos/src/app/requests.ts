const baseUrl = 'http://localhost:3000/'

export const getRequest = async (endpoint: string) => {
  return fetch(baseUrl + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const postRequest = async (body: any, endpoint: string) => {
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}
