import AuthLayout from 'layout/AuthLayout'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('container/Auth/Login'))

export default function IndexPage() {
  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  )
}
