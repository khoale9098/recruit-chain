import { useMemo } from 'react'
import { ApolloLink, HttpLink, from, split, ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { RetryLink } from '@apollo/client/link/retry'
import { onError } from '@apollo/client/link/error'
import { parseCookies } from 'nookies'
import { logout } from 'core/api'

let apolloClient
let _serverCookie

const isServer = typeof window === 'undefined'

const getToken = () => {
  const cookie = isServer ? _serverCookie : parseCookies()
  try {
    const store = JSON.parse(cookie.recoil_persistence)
    return store?.persist_user_info?.token
  } catch (err) {
    return null
  }
}

/* Apollo setup */

const retryLink = new RetryLink({
  attempts: {
    max: 2,
    retryIf: (error, _operation) => !!error && _operation !== 'mutation',
  },
  delay: {
    initial: 500,
    max: Infinity,
    jitter: true,
  },
})

function createMainLink() {
  const token = getToken()
  const httpLink = new HttpLink({
    uri: process.env.APOLLO_SERVER_URI,
  })
  if (isServer) {
    return httpLink
  }

  const wsLink = new WebSocketLink({
    uri: process.env.APOLLO_WS_URI,
    options: {
      reconnect: true,
      connectionParams: () => ({
        Authorization: token ? `Bearer ${token}` : undefined,
      }),
    },
  })

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const mainLink = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)

      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
  )

  return mainLink
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, path, extensions = {} }) =>
        console.log(`%c [GraphQL error]: Message: ${message}, Code: ${extensions.code}, Path: ${path && path[0]}`, 'color: red')
      )
    }
  }
  if (graphQLErrors) {
    graphQLErrors.map(({ extensions }) => extensions?.code === 'UNAUTHENTICATED' && !isServer && logout())
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    if (networkError.result && networkError.result.code === 401) {
      if (!isServer) logout()
      // eslint-disable-next-line
      networkError.result.errors = null
    }
  }
})

// logger
const loggerLink = new ApolloLink((operation, forward) =>
  forward(operation).map((result) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`%c [GraphQL Logger] received result from ${operation.operationName}`, 'color: gray')
      console.log(result?.data || result)
    }

    return result
  })
)
const cache = new InMemoryCache()

const authLink = new ApolloLink((operation, forward) => {
  const token = getToken()

  operation.setContext({
    headers: { authorization: token ? `Bearer ${token}` : null },
  })

  return forward(operation)
})

function createApolloClient() {
  const allLinks = isServer
    ? [authLink, errorLink, createMainLink()]
    : [authLink, loggerLink, errorLink, retryLink, createMainLink()]
  const client = new ApolloClient({
    ssrMode: isServer,
    link: from(allLinks),
    cache,
  })

  return client
}

export function initApolloClient(initialState = null) {
  // eslint-disable-next-line no-underscore-dangle
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  // For SSG and SSR always create a new Apollo Client
  if (isServer) return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState, serverCookie) {
  _serverCookie = serverCookie
  const store = useMemo(() => initApolloClient(initialState), [initialState])
  return store
}
