import { Avatar } from 'antd'
import CoverImage from './CoverImage'
import AboutUser from './AboutUser'
import AvatarEmployee from './AvatarEmployee'
import SocialNetwork from './SocialNetwork'
import Experience from './Experience'
import Education from './Education'
import RightSideContainer from './RightSideContainer'

const ProfileUI = () => {
  return (
    <div className="w-full pb-12">
      <div className="w-full flex">
        <div className="w-8/12">
          <section className="overflow-visible bg-white rounded-sm shadow-md">
            <CoverImage />
            <div className="px-6 pb-6">
              <div className="flex">
                <AvatarEmployee />
              </div>
              <div className="pt-2 flex justify-between">
                <div>
                  <div className="font-bold text-2xl">Khoa Le</div>
                  <div className="text-xl">Software Engineer at Agecode Co.Ltd</div>
                  <div>Ho Chi Minh City</div>
                </div>
                <div>
                  <SocialNetwork />
                  <div className="flex pt-3 items-center " style={{ maxWidth: '232px' }}>
                    <Avatar
                      size={32}
                      className="flex-none box-border border-2 border-solid border-transparent rounded"
                      src="https://media-exp1.licdn.com/dms/image/C510BAQEaVrl7oCuRsg/company-logo_100_100/0?e=1612396800&v=beta&t=DIqbAkSTAW7VxvROkovQ234g5pYKmjsdRScaBBiF0pc"
                      shape
                    />
                    <div className="font-semibold ml-2">HCMC University of Technology and Education</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <AboutUser />
          <Education />
          <Experience />
        </div>
        <div className="w-4/12 bg-white ml-2">
          <RightSideContainer />
        </div>
      </div>
    </div>
  )
}

export default ProfileUI
