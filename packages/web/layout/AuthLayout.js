import React from 'react'
import BannerImage from 'components/BannerImage'
import PropTypes from 'prop-types'

const AuthLayout = ({ children }) => {
  return (
    <div className="lg:flex">
      <div className="hidden lg:flex items-center justify-center flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <BannerImage />
        </div>
      </div>
      {children}
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default AuthLayout
