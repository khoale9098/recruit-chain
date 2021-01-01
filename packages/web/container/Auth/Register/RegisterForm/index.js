import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Form, Input, Button, Radio, message } from 'antd'
import { register } from 'core/api'

const REGISTER_FIELD = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  COMPANY_NAME: 'companyName',
  USER_TYPE: 'userType',
}

const USER_TYPE = {
  EMPLOYEE: 'employee',
  EMPLOYER: 'employer',
}

const RegisterForm = () => {
  const [userType, setUserType] = useState(USER_TYPE.EMPLOYEE)
  const router = useRouter()
  const [form] = Form.useForm()

  const onSubmit = async (values) => {
    const res = await register(values)
    message.success('Register Successful!')
    if (res) router.replace('/')
  }
  return (
    <Form onFinish={onSubmit} form={form}>
      {userType === USER_TYPE.EMPLOYEE ? (
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
      ) : (
        <div>
          <div className="text-sm font-bold text-gray-700 tracking-wide">Company Name</div>
          <div>
            <Form.Item name={REGISTER_FIELD.COMPANY_NAME}>
              <Input
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Company Name"
              />
            </Form.Item>
          </div>
        </div>
      )}
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
        <div className="ml-4 w-1/2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold text-gray-700 tracking-wide">Confirm</div>
          </div>
          <Form.Item rules={[{ required: true, message: 'Please enter confirm password!' }]}>
            <Input
              type="password"
              className="w-full text-base py-2 rounded-sm focus:outline-none focus:border-indigo-500 "
              placeholder="Confirm"
            />
          </Form.Item>
        </div>
      </div>
      <Form.Item initialValue={USER_TYPE.EMPLOYEE} name={REGISTER_FIELD.USER_TYPE}>
        <Radio.Group onChange={(e) => setUserType(e.target.value)}>
          <Radio value={USER_TYPE.EMPLOYEE}>Employee</Radio>
          <Radio value={USER_TYPE.EMPLOYER}>Employer</Radio>
        </Radio.Group>
      </Form.Item>
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
