import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Tag } from 'antd'
import { useLazyQuery, gql } from '@apollo/client'

const USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      firstName
      avatar
      lastName
      companyName
      userType
    }
  }
`

const ResponseItem = ({ item }) => {
  const [loadUser, { data, loading }] = useLazyQuery(USER)

  React.useEffect(() => {
    if (item?.creator?._id) {
      loadUser({
        variables: {
          id: item?.creator?._id,
        },
      })
    }
  }, [item?.creator?._id])

  const creator =
    data?.user?.userType === 'employee' ? `${data?.user?.firstName} ${data?.user?.lastName}` : data?.user?.companyName

  return (
    <div>
      <div className="flex">
        <div className="flex-none">
          <Badge color="#87d068" offset={[-8, 4]} dot>
            <Avatar className="flex justify-center items-center" size={48} icon={<UserOutlined />} src={data?.user?.avatar} />
          </Badge>
        </div>
        <div className="w-full ml-2 pl-2">
          <h3 className="font-bold text-base">{creator}</h3>
          <p className="pt-2">{item?.content}</p>
          <Tag color="green">Approved</Tag>
        </div>
      </div>
    </div>
  )
}

export default ResponseItem
