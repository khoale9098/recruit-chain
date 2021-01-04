import React from 'react'
import CoverImage from 'container/Profile/CoverImage'
import AvatarEmployee from 'container/Profile/AvatarEmployee'
import AboutUser from 'container/Profile/AboutUser'

const InformationView = ({ user }) => {
  const isEmployee = user?.userType === 'employee'
  return (
    <div className="w-full flex-1">
      <section className="overflow-visible bg-white rounded-sm shadow-md">
        <CoverImage coverImage={user?.coverImage} />
        <div className="px-6 pb-6 relative">
          <div className="flex">
            <AvatarEmployee avatar={user?.avatar} />
          </div>
          <div className="pt-2 flex justify-between">
            <div>
              <div className="font-bold text-2xl">
                {isEmployee ? `${user?.firstName} ${user?.lastName}` : user?.companyName}
              </div>
              {/* {isEmployee && <div className="text-xl">{title && `${title} at ${name}`}</div>} */}
              <div>{user?.live || ''}</div>
            </div>
          </div>
        </div>
      </section>
      <AboutUser about={user?.about} isEmployee={isEmployee} />
      {/* {isEmployee && (
        <>
          {user?.skill?.length > 0 && <Skills />}
          <Education />
          <Experience />
        </>
      )} */}
    </div>
  )
}

export default InformationView
