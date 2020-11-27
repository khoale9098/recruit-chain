import ProfileUI from 'container/Profile'
import PageLayout from 'layout/PageLayout'
import { useRecoilValue } from 'recoil'
import { authAtoms } from 'store'

const Profile = () => {
  const auth = useRecoilValue(authAtoms.auth)

  return (
    <PageLayout>
      <ProfileUI />
    </PageLayout>
  )
}

export default Profile
