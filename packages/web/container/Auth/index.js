import React from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('./Login'))

const AuthLoader = () => {
  return (
    <>
      <div>
        <Login />
      </div>
    </>
  )
}

export default AuthLoader
