import React from 'react'
import moment from 'moment'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import InformationView from 'container/ProfileView/InformationView'

const GET_USER_BY_ID = gql`
  query user($id: ID!) {
    user(id: $id) {
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

const ProfileViewUI = () => {
  const {
    query: { id },
  } = useRouter()
  const { data } = useQuery(GET_USER_BY_ID, {
    variables: {
      id,
    },
  })

  return (
    <>
      <div className="flex bg-white items-center shadow-xs">
        <h3 className="font-bold text-lg py-4 pl-3"> Your Profile</h3>
        <div className="pl-4 text-gray-600">{`was online at ${moment().format('YYYY/MM/DD')}  at 12:32:37`}</div>
      </div>
      <div className="w-full pb-12">
        <div className="w-full flex">
          {/*  */}
          <InformationView user={data?.user} />
          <div className="ml-2 w-full" style={{ maxWidth: '380px' }}>
            {/* <RightSideContainer /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileViewUI
