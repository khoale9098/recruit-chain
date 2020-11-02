import React from 'react'
import { Layout, Button } from 'antd'
import PropTypes from 'prop-types'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

import SearchAnything from 'components/Search/SearchAnything'

const { Header } = Layout

const HeaderLayout = ({ setCollapsed, collapsed }) => {
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
        <div className="flex justify-center items-center w-3/4 px-16">
          <SearchAnything />
        </div>
        <div>
          <Button>Add New Skill</Button>
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
