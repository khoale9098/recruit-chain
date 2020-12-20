import React from 'react'
import { List, Card, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const ResponsesList = () => {
  return (
    <div className="mx-2 px-4">
      <Card>
        <List>
          <List.Item>
            <div className="w-full flex">
              <div className="flex-none mr-4">
                <Avatar size={48} className="flex justify-center items-center" icon={<UserOutlined />} />
              </div>
              <div className="flex flex-col w-full">
                <h3 className="font-semibold text-base">Title</h3>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio maxime voluptas temporibus facilis est
                  quam magnam veritatis aliquid repellendus, quia aut corrupti totam nulla commodi atque deserunt dolorem! Nemo,
                  delectus.
                </p>
              </div>
            </div>
          </List.Item>
        </List>
      </Card>
    </div>
  )
}

export default ResponsesList
