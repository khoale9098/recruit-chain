import React from 'react'
import { parseCookies, setCookie } from 'nookies'
import { RecoilRoot, useRecoilTransactionObserver_UNSTABLE as useRecoilObserver } from 'recoil'
import registerPersistAtoms from 'store/registerPersist'

const clientCookieKey = 'recoil_persistence'

function PersistenceObserver({ children }) {
  useRecoilObserver(({ snapshot }) => {
    registerPersistAtoms.forEach((atom) => {
      const atomValue = snapshot.getLoadable(atom).contents
      const cookies = parseCookies()

      const isValidCookie = cookies && cookies[clientCookieKey]
      const clientCookieState = isValidCookie ? JSON.parse(cookies[clientCookieKey]) : null

      const nextState = clientCookieState ? { ...clientCookieState, [atom.key]: atomValue } : { [atom.key]: atomValue }
      setCookie(null, clientCookieKey, JSON.stringify(nextState), {
        path: '/',
      })
    })
  })

  return children
}

function RecoilPersistRoot({ children, recoilCookie = {} }) {
  const initRecoilStates = ({ set }) => {
    if (recoilCookie) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in recoilCookie) {
        if (Object.prototype.hasOwnProperty.call(recoilCookie, key)) {
          set({ key }, recoilCookie[key])
        }
      }
    }
  }

  return (
    <RecoilRoot initializeState={initRecoilStates}>
      <PersistenceObserver>{children}</PersistenceObserver>
    </RecoilRoot>
  )
}

export const getRecoilCookie = (ctx) => {
  const cookies = parseCookies(ctx)

  try {
    const parsedCookie = JSON.parse(cookies[clientCookieKey])
    return parsedCookie
  } catch (err) {
    return {}
  }
}

export default RecoilPersistRoot
