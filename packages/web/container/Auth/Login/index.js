import React from 'react'
import Link from 'next/link'
import LoginForm from 'container/Auth/Login/LoginForm'

const Login = () => {
  return (
    <div className="lg:w-1/2 xl:max-w-screen-sm shadow">
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
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
          Log in
        </h2>
        <div className="mt-12">
          <LoginForm />
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account?
            <Link href="/signup">
              <a className="cursor-pointer pl-1 text-indigo-600 hover:text-indigo-800">Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
