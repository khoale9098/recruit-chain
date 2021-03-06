import React from 'react'
import dynamic from 'next/dynamic'
import BannerImage from 'components/BannerImage'

const Login = dynamic(() => import('./Login'))

const AuthLoader = () => {
  return (
    <div className="lg:flex">
      <div className="hidden lg:flex items-center justify-center flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <BannerImage />
        </div>
      </div>
      <Login />
    </div>
  )
}

export default AuthLoader
