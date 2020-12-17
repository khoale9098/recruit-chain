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
  // prefixUrl: process.env.SERVER_URI,
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
  return response
}

export const register = async (json) => {
  const response = post('auth/register', json)
  return response
}

export const logout = (customBackLink) => {
  // TODO: call logout backend
  destroyCookie(null, 'recoil_persistence', {
    path: '/',
  })

  if (typeof window !== 'undefined') {
    if (window.FB) {
      window.FB.logout()
    }
  }
  // TODO: need to reset recoil store, but can not use hook outside component, so for now force reload
  setTimeout(() => {
    window.location.replace(customBackLink || '/')
  }, 500)
}

export const upload = ({ file }) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjksImF0IjoiMjAyMDEyMTYiLCJpYXQiOjE2MDgwOTEwMjR9.j0AA7YRJYafNOqxOJYtOkURA-dR9ELtF_sB-Ypsvsag'
  const formData = new FormData()
  formData.append('upload', file.originFileObj)
  return ky
    .post('https://api.stg.hosukuru.c2sg.asia/upload', {
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json()
}
