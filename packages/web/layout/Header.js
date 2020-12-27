import React from 'react'
import { Layout, Avatar, Dropdown, Menu, Button, Space } from 'antd'
import { useRouter } from 'next/router'
import { useQuery, gql, useApolloClient } from '@apollo/client'
import PropTypes from 'prop-types'
import { logout } from 'core/api'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownCircleFilled, PlusCircleOutlined } from '@ant-design/icons'

import SearchAnything from 'components/Search/SearchAnything'

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      avatar
      tokenWork
      userType
    }
  }
`

const { Header } = Layout

const HeaderLayout = ({ setCollapsed, collapsed }) => {
  const { data } = useQuery(CURRENT_USER)
  const client = useApolloClient()
  const router = useRouter()

  const onLogout = async () => {
    client.cache.gc()
    await logout()
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={() => router.push('/profile')}>
        <div>Profile</div>
      </Menu.Item>
      <Menu.Item onClick={() => onLogout()}>
        <div>Sign out</div>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header
      className="bg-white flex items-center shadow-sm fixed w-full "
      style={{ padding: 0, color: '#4b4b5a', height: '72px', zIndex: 1000 }}
    >
      <div className="flex w-full  ">
        <div className="pl-5 text-lg text-primary">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </div>
        <div className="flex justify-center items-center w-3/5 px-16">
          <SearchAnything />
        </div>
        <div className="flex pl-4 items-center ">
          <Space>
            {data?.currentUser?.userType === 'employer' ? (
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                className="rounded h-10 flex items-center"
                onClick={() => router.push('/my-vacancies/add')}
              >
                Add New Vacancie
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                className="rounded h-10 flex items-center"
                onClick={() => router.push('/my-vacancies/add')}
              >
                Add New Skill
              </Button>
            )}
            <Dropdown overlay={menu}>
              <div className="relative cursor-pointer">
                <Avatar size={48} src={data?.currentUser?.avatar} className="border-2 border-solid border-primary" />
                <DownCircleFilled style={{ color: '#5369f8' }} className="absolute right-0 bottom-0 mb-3" size={32} />
              </div>
            </Dropdown>
          </Space>
        </div>
      </div>
    </Header>
  )
}
HeaderLayout.propTypes = {
  setCollapsed: PropTypes.func,
  collapsed: PropTypes.bool,
}

HeaderLayout.defaultProps = {
  setCollapsed: () => {},
  collapsed: false,
}

export default HeaderLayout
