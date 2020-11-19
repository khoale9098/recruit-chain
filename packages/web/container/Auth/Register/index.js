import React from 'react'
import RegisterForm from './RegisterForm'

const Register = () => {
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm shadow">
      <div className="py-6 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div className="" style={{ maxWidth: '200px' }}>
            <img src="/img/logos.png" alt="" />
          </div>
        </div>
      </div>
      <div className="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
          xl:text-bold"
        >
          Sign Up
        </h2>
        <div className="mt-12">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default Register
