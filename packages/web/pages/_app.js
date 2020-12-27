import App from 'next/app'
import { ApolloProvider } from '@apollo/client'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import RecoilPersist, { getRecoilCookie } from 'components/hocs/RecoilPersist'
import { useApollo } from 'core/apollo'
import { setToken } from 'core/api'

import 'styles/styles.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState, pageProps.serverCookie)
  if (pageProps.recoilCookie?.persist_user_info?.token) {
    setToken(pageProps.recoilCookie?.persist_user_info?.token)
  }
  return (
    <ApolloProvider client={apolloClient}>
      <RecoilPersist recoilCookie={pageProps.recoilCookie}>
        <Component {...pageProps} />
      </RecoilPersist>
    </ApolloProvider>
  )
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const { defaultProps } = appContext.Component

  const recoilCookie = getRecoilCookie(appContext.ctx)
  const namespacesRequired = [...(appProps.pageProps.namespacesRequired || []), ...(defaultProps?.i18nNamespaces || [])]

  return {
    ...appProps,
    pageProps: { ...appProps.pageProps, recoilCookie, namespacesRequired },
  }
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
}
export default MyApp
