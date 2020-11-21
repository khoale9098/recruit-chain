import ky from 'ky-universal'
import { destroyCookie } from 'nookies'

async function getResponsePayload(req, opts, res) {
  if (res.status !== 200) {
    const payload = await res.json()

    const status = payload.code || 500
    const rest = new Response(null, { status })
    rest.payload = payload

    return rest
  }

  return res
}

let api = ky.create({
  prefixUrl: 'http://localhost:3002',
  hooks: {
    afterResponse: [getResponsePayload],
  },
})

export const setToken = (token) => {
  // HTTP header
  api = api.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const post = async (url, json) => {
  const response = await api.post(url, { json }).json()
  if (response?.token) {
    setToken(response.token)
  }
  return response
}

export const login = async (json) => {
  const response = post('auth/login', json)
  if (response?.token) {
    setToken(response.token)
  }
  return response
}

export const register = async (json) => {
  const response = post('auth/register', json)

  if (response?.token) {
    setToken(response.token)
  }
  return response
}
