import { useState } from 'react'
import Link from 'next/link'
import { Form, Input, Button, Radio } from 'antd'

const REGISTER_FIELD = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  COMPANY_NAME: 'companyName',
}

const RegisterForm = () => {
  const onSubmit = (values) => {
    console.log('values: ', values)
  }
  return (
    <Form onFinish={onSubmit}>
      <div className="flex flex-row">
        <div className="w-1/2">
          <div className="text-sm font-bold text-gray-700 tracking-wide">First name</div>
          <Form.Item name={REGISTER_FIELD.FIRST_NAME}>
            <Input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="First Name"
            />
          </Form.Item>
        </div>
        <div className="w-1/2 ml-4">
          <div className="text-sm font-bold text-gray-700 tracking-wide">Last name</div>
          <Form.Item name={REGISTER_FIELD.LAST_NAME}>
            <Input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Last Name"
            />
          </Form.Item>
        </div>
      </div>
      <div>
        <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
        <Form.Item name={REGISTER_FIELD.USERNAME}>
          <Input
            className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Username"
          />
        </Form.Item>
      </div>
      <div>
        <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
        <Form.Item name={REGISTER_FIELD.EMAIL} rules={[{ required: true, type: 'email', message: 'Please enter email!' }]}>
          <Input
            className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="mike@gmail.com"
          />
        </Form.Item>
      </div>
      <div className="mt-4 flex flex-row">
        <div className="w-1/2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
          </div>
          <Form.Item name={REGISTER_FIELD.PASSWORD} rules={[{ required: true, message: 'Please enter password!' }]}>
            <Input
              type="password"
              className="w-full text-base py-2 rounded-sm focus:outline-none focus:border-indigo-500 "
              placeholder="Enter your password"
            />
          </Form.Item>
        </div>
        {/* <div className="ml-4 w-1/2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-gray-700 tracking-wide">Confirm</div>
          </div>
          <Form.Item name={REGISTER_FIELD.PASSWORD} rules={[{ required: true, message: 'Please enter password!' }]}>
            <Input
              type="password"
              className="w-full text-base py-2 rounded-sm focus:outline-none focus:border-indigo-500 "
              placeholder="Confirm"
            />
          </Form.Item>
        </div> */}
      </div>
      <div className="mt-10">
        <Button
          htmlType="submit"
          className="bg-indigo-500 text-white flex items-center justify-center w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 hover:text-white
            shadow-lg"
          style={{ height: '48px' }}
        >
          Agree and Join
        </Button>
      </div>
      <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
        Already on Awoker?
        <Link href="/">
          <a className=" px-2 cursor-pointer text-indigo-600 hover:text-indigo-800">Sign in</a>
        </Link>
      </div>
    </Form>
  )
}

export default RegisterForm
