import React from 'react'
import { Layout, Avatar, Dropdown, Menu } from 'antd'
import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownCircleFilled, ThunderboltFilled } from '@ant-design/icons'

import SearchAnything from 'components/Search/SearchAnything'

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
      avatar
      tokenWork
    }
  }
`

const { Header } = Layout

const menu = (
  <Menu>
    <Menu.Item>
      <div>Profile</div>
    </Menu.Item>
    <Menu.Item>
      <div>Sign out</div>
    </Menu.Item>
  </Menu>
)
const HeaderLayout = ({ setCollapsed, collapsed }) => {
  const { data } = useQuery(CURRENT_USER)

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
        <div className="flex pl-4">
          <Dropdown overlay={menu}>
            <div className="relative cursor-pointer">
              <Avatar size={48} src={data?.currentUser?.avatar} className="border-2 border-solid border-primary" />
              <DownCircleFilled style={{ color: '#5369f8' }} className="absolute right-0 bottom-0 mb-3" size={32} />
            </div>
          </Dropdown>
          <div className="flex items-center ml-4">
            <ThunderboltFilled style={{ color: '#5369f8', fontSize: 18 }} />
            <div className="ml-1 text-base text-primary">{`${data?.currentUser?.tokenWork || 100000}`}</div>
          </div>
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
