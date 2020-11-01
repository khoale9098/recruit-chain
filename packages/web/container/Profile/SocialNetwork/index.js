import React from 'react'
import { GithubOutlined, TwitterOutlined, SkypeOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons'

const SocialNetwork = () => {
  return (
    <div className="flex">
      <div className="flex">
        <GithubOutlined className="text-2xl mx-2" />
        <LinkedinOutlined className="text-2xl mx-2" />
        <FacebookOutlined className="text-2xl mx-2" />
        <SkypeOutlined className="text-2xl mx-2" />
        <TwitterOutlined className="text-2xl mx-2" />
      </div>
    </div>
  )
}

export default SocialNetwork
