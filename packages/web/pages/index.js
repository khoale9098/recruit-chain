import { useEffect } from 'react'
import AuthLayout from 'layout/AuthLayout'
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'

import { authAtoms } from 'store'

const Login = dynamic(() => import('container/Auth/Login'))

export default function IndexPage() {
  const router = useRouter()

  const { token, userType } = useRecoilValue(authAtoms.userPersisted)

  const redirectIfLogged = () => {
    if (token) {
      if (userType === 'employee') router.replace('/profile')
      if (userType === 'employer') router.replace('/dashboard')
    }
  }
  useEffect(() => {
    redirectIfLogged()
  }, [token])

  if (token) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <div className="lds-facebook">
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }

  return (
    <AuthLayout>
      <Login />
    </AuthLayout>
  )
}
