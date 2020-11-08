import React from 'react'
import BannerImage from 'components/BannerImage'
import LoginForm from 'container/Auth/Login/LoginForm'

const Login = () => {
  return (
    <div className="lg:flex">
      <div className="hidden lg:flex items-center justify-center flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <BannerImage />
        </div>
      </div>

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
              Dont have an account ?
              <a href="/#" className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
