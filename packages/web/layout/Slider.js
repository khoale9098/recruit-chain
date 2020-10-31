import React from 'react'
import { Layout, Menu } from 'antd'

import { FormOutlined, AppstoreOutlined, SyncOutlined, ProjectOutlined, BarChartOutlined } from '@ant-design/icons'
import OnlineUser from 'components/OnlineUser'

const Logo = () => {
  return (
    <div className="bg-white px-6 py-2 flex justify-center items-center" style={{ height: '72px' }}>
      <div className="w-3/4">
        <img src="/img/logos.png" alt="" />
      </div>
    </div>
  )
}
const SliderLayout = ({ collapsed }) => {
  return (
    <Layout.Sider className="bg-white" trigger={null} collapsible collapsed={collapsed}>
      <Logo />
      <div className="bg-white flex justify-center items-center">
        <OnlineUser isCollapsed={collapsed} />
      </div>

      <Menu mode="inline" defaultSelectedKeys={['1']} className="bg-white">
        <Menu.Item key="1" icon={<FormOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          Carrers
        </Menu.Item>
        <Menu.Item key="3" icon={<SyncOutlined />}>
          Responses
        </Menu.Item>
        <Menu.Item key="4" icon={<ProjectOutlined />}>
          Finance
        </Menu.Item>
        <Menu.Item key="5" icon={<BarChartOutlined />}>
          Statistics
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

export default SliderLayout
