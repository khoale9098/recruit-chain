import React from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('./Login'))
const Register = dynamic(() => import('./Register'))

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
