import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authAtoms } from '../store'

const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      companyName
      avatar
      firstName
      lastName
      createdAt
      updatedAt
      userType
    }
  }
`
const SecurityLayout = ({ children, employer = false }) => {
  const router = useRouter()
  const [isReady, setReady] = useState(false)
  const setAuth = useSetRecoilState(authAtoms.auth)
  const { token, userId, userType } = useRecoilValue(authAtoms.userPersisted)
  const [fetchUserDetail, { data, loading }] = useLazyQuery(USER)

  const isAccessWrongScreen = (userType === 'employee' && employer) || (userType === 'employer' && !employer)
  const rootRoute = '/'

  useEffect(() => {
    const shouldDeny = !token || !userId || isAccessWrongScreen
    if (shouldDeny) {
      router.replace(rootRoute)
    } else {
      fetchUserDetail({ variables: { id: userId, onlyDefault: false } })
    }
  }, [token])

  useEffect(() => {
    if (data?.user && !isAccessWrongScreen) {
      setAuth({ user: data.user })
      setReady(true)
    }
  }, [data, userType])

  if ((token && loading) || !isReady) {
    return null
  }
  return <div>{children}</div>
}

SecurityLayout.propTypes = {
  children: PropTypes.node.isRequired,
  employer: PropTypes.bool,
}
SecurityLayout.defaultProps = {
  employer: false,
}

export default SecurityLayout
