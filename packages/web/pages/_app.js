import App from 'next/app'
import PropTypes from 'prop-types'
import RecoilPersist, { getRecoilCookie } from 'components/hocs/RecoilPersist'

import 'styles/styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilPersist recoilCookie={pageProps.recoilCookie}>
      <Component {...pageProps} />
    </RecoilPersist>
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
