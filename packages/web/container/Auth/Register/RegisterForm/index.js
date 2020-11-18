import React from 'react'
import { Form, Input, Button } from 'antd'

const REGISTER_FIELD = {
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
}

const RegisterForm = () => {
  const onSubmit = () => {}
  return (
    <Form onFinish={onSubmit}>
      <div>
        <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
        <Form.Item name={REGISTER_FIELD.EMAIL} rules={[{ required: true, type: 'email', message: 'Please enter email!' }]}>
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
        <Form.Item name={REGISTER_FIELD.PASSWORD} rules={[{ required: true, message: 'Please enter password!' }]}>
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

export default RegisterForm
