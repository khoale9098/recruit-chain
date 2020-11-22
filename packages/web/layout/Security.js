import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authAtoms } from 'store'

const SecurityLayout = ({ children }) => {
  const router = useRouter()

  const { token, userId, userType } = useRecoilValue(authAtoms)

  return <div>{children}</div>
}

SecurityLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SecurityLayout
