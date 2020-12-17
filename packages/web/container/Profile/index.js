import { useRecoilValue } from 'recoil'
import { authAtoms } from 'store'
import dayjs from 'dayjs'
import Information from './Information'

import RightSideContainer from './RightSideContainer'

const ProfileUI = () => {
  const { userType } = useRecoilValue(authAtoms.userPersisted)

  return (
    <>
      <div className="flex bg-white items-center shadow-xs">
        <h3 className="font-bold text-lg py-4 pl-3"> Your Profile</h3>
        <div className="pl-4 text-gray-600">{`was online at ${dayjs().format('YYYY/MM/DD')}  at 12:32:37`}</div>
      </div>
      <div className="w-full pb-12">
        <div className="w-full flex">
          {/*  */}
          <Information userType={userType} />
          <div className="ml-2 w-full" style={{ maxWidth: '380px' }}>
            <RightSideContainer />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileUI
