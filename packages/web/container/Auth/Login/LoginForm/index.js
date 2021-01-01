import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { login } from 'core/api'
import { useSetRecoilState } from 'recoil'
import { authAtoms } from '../../../../store'

const LOGIN_FIELD = {
  EMAIL: 'email',
  PASSWORD: 'password',
  USER_TYPE: 'userType',
}

const LoginForm = () => {
  const setUserPersist = useSetRecoilState(authAtoms.userPersisted)

  const onSubmit = async (values) => {
    try {
      const response = await login(values)

      const {
        token,
        user: { userType },
        userId,
      } = response.data

      setUserPersist({
        token,
        userId,
        userType,
      })
      message.success('Login successfuly!')
    } catch (e) {
      message.error('Enter the wrong account or password!')
    }
  }

  return (
    <Form onFinish={onSubmit}>
      <div>
        <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
        <Form.Item name={LOGIN_FIELD.EMAIL} rules={[{ required: true, type: 'email', message: 'Please enter email!' }]}>
          <Input
            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="mike@gmail.com"
          />
        </Form.Item>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
          <div>
            <div className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
              Forgot Password?
            </div>
          </div>
        </div>
        <Form.Item name={LOGIN_FIELD.PASSWORD} rules={[{ required: true, message: 'Please enter password!' }]}>
          <Input
            type="password"
            className="w-full text-lg py-2 rounded-sm focus:outline-none focus:border-indigo-500 "
            placeholder="Enter your password"
          />
        </Form.Item>
      </div>
      <div className="mt-10">
        <Button
          htmlType="submit"
          className="bg-indigo-500 text-white flex items-center justify-center w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 hover:text-white
              shadow-lg"
          style={{ height: '48px' }}
        >
          Log In
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm
