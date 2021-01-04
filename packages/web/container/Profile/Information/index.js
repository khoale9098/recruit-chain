import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { Avatar, Spin } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import CoverImage from '../CoverImage'
import AboutUser from '../AboutUser'
import AvatarEmployee from '../AvatarEmployee'
// import SocialNetwork from '../SocialNetwork'
import Experience from '../Experience'
import Education from '../Education'
import Skills from '../Skills'
import ModalEditUser from '../ModalEditUser'

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      companyName
      avatar
      firstName
      lastName
      createdAt
      updatedAt
      skill {
        _id
      }
      coverImage
      about
      live
      userType
    }
  }
`
const GET_MY_EXPERIENCE = gql`
  query getMyExperience {
    getMyExperience {
      _id
      experience {
        job_title
        companyName
      }
    }
  }
`

const UPDATE_USER = gql`
  mutation updateUser($userInput: UserInput) {
    updateUser(userInput: $userInput) {
      _id
      companyName
      avatar
      live
      firstName
      lastName
      about
      createdAt
      updatedAt
      coverImage
      userType
    }
  }
`

const GET_MY_EDUCATION = gql`
  query getMyEducation {
    getMyEducation {
      _id
      education {
        education_org
      }
    }
  }
`

const Information = () => {
  const [showEdit, setShowEdit] = React.useState(false)
  const { data, loading, refetch } = useQuery(CURRENT_USER)
  const { data: cur } = useQuery(GET_MY_EXPERIENCE)
  const { data: edu } = useQuery(GET_MY_EDUCATION)

  const title = cur?.getMyExperience?.experience?.[0]?.job_title
  const name = cur?.getMyExperience?.experience?.[0]?.companyName

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted() {
      refetch()
    },
  })

  const handleUpdateAvatar = async (url) => {
    await updateUser({
      variables: {
        userInput: {
          avatar: url,
        },
      },
    })
  }
  const handleUpdateCoverImage = async (url) => {
    await updateUser({
      variables: {
        userInput: {
          coverImage: url,
        },
      },
    })
  }
  if (loading)
    return (
      <div className="w-full flex-1">
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      </div>
    )

  const isEmployee = data?.currentUser?.userType === 'employee'

  return (
    <div className="w-full flex-1">
      <section className="overflow-visible bg-white rounded-sm shadow-md">
        <CoverImage coverImage={data?.currentUser?.coverImage} updateCoverImage={handleUpdateCoverImage} />
        <div className="px-6 pb-6 relative">
          <EditOutlined
            className="text-gray-700 absolute right-0 text-2xl pt-2 pr-4 cursor-pointer"
            onClick={() => setShowEdit(true)}
          />
          <div className="flex">
            <AvatarEmployee avatar={data?.currentUser?.avatar} updateAvatar={handleUpdateAvatar} />
          </div>
          <div className="pt-2 flex justify-between">
            <div>
              <div className="font-bold text-2xl">
                {data?.currentUser?.userType === 'employee'
                  ? `${data?.currentUser?.firstName} ${data?.currentUser?.lastName}`
                  : data?.currentUser?.companyName}
              </div>
              {isEmployee && <div className="text-xl">{title && `${title} at ${name}`}</div>}
              <div>{data?.currentUser?.live || ''}</div>
            </div>
            <div>
              {/* <SocialNetwork /> */}
              {isEmployee && (
                <div className="flex pt-3 items-center " style={{ maxWidth: '232px' }}>
                  {edu?.getMyEducation?.education?.[0]?.education_org && (
                    <Avatar
                      size={32}
                      className="flex-none box-border border-2 border-solid border-transparent rounded"
                      shape
                      src="https://media-exp1.licdn.com/dms/image/C510BAQEaVrl7oCuRsg/company-logo_100_100/0?e=1612396800&v=beta&t=DIqbAkSTAW7VxvROkovQ234g5pYKmjsdRScaBBiF0pc"
                    />
                  )}

                  <div className="font-semibold ml-2">{edu?.getMyEducation?.education?.[0]?.education_org || ''}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <AboutUser about={data?.currentUser?.about} updateUser={updateUser} isEmployee={isEmployee} />
      {isEmployee && (
        <>
          {data?.currentUser?.skill?.length > 0 && <Skills />}
          <Education />
          <Experience />
        </>
      )}
      <ModalEditUser show={showEdit} cancel={() => setShowEdit(false)} updateUser={updateUser} user={data?.currentUser} />
    </div>
  )
}

export default Information
