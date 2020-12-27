import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Tag } from 'antd'

const ResponseItem = () => {
  return (
    <div>
      <div className="flex">
        <div className="flex-none">
          <Badge color="#87d068" offset={[-8, 4]} dot>
            <Avatar className="flex justify-center items-center" size={48} icon={<UserOutlined />} />
          </Badge>
        </div>
        <div className="w-full ml-2 pl-2">
          <h3 className="font-bold text-base">Alex White from Blue Glue</h3>
          <p className="pt-2">
            Dear candidate,
            <br />
            Thanks for your response! We are happy to see the interest in our project!
            <br />
            It is a busy time for our company right now so we will try to contact you as soon as possible.
            <br />
            Thank you for understanding.
            <br />
            Looking forward to seeing you soon!
            <br />
            <br />
            Regards, Alex from the AccelTutoring
          </p>
          <Tag color="green">Approved</Tag>
        </div>
      </div>
    </div>
  )
}

export default ResponseItem
