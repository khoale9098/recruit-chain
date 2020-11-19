import React from 'react'
import dynamic from 'next/dynamic'
import AuthLayout from 'layout/AuthLayout'

const Register = dynamic(() => import('container/Auth/Register'))

const SignUp = () => {
  return (
    <AuthLayout>
      <Register />
    </AuthLayout>
  )
}

export default SignUp
