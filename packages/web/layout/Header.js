import React from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

// import SearchAnything from 'components/SearchAnything'

const { Header } = Layout

const HeaderLayout = ({ setCollapsed, collapsed }) => {
  return (
    <Header className="bg-white flex items-center shadow-sm" style={{ padding: 0, color: '#4b4b5a', height: '72px' }}>
      <div className="pl-5 text-lg text-primary">
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </div>
      <div className="flex justify-center items-center">{/* <SearchAnything /> */}</div>
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
