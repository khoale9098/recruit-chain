import React from 'react'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import { FormOutlined, AppstoreOutlined, SyncOutlined, ProjectOutlined, BarChartOutlined } from '@ant-design/icons'
import OnlineUser from 'components/OnlineUser'

const Logo = () => {
  return (
    <Link href="/profile">
      <div className="bg-white px-6 py-2 flex justify-center items-center" style={{ height: '72px' }}>
        <div className="w-3/4">
          <img src="/img/logos.png" alt="" />
        </div>
      </div>
    </Link>
  )
}
const SliderLayout = ({ collapsed }) => {
  const router = useRouter()
  const { asPath } = router

  const menu = [
    {
      name: 'Profile',
      href: '/profile',
      icon: <FormOutlined />,
    },
    {
      name: 'Carrers',
      href: '/carrers',
      icon: <AppstoreOutlined />,
    },
    {
      name: 'Responses',
      href: '/responses',
      icon: <SyncOutlined />,
    },
    {
      name: 'Finance',
      href: '/finance',
      icon: <ProjectOutlined />,
    },
    {
      name: ' Statistics',
      href: '/statistic',
      icon: <BarChartOutlined />,
    },
  ]

  return (
    <Layout.Sider className="bg-white" trigger={null} collapsible collapsed={collapsed}>
      <Logo />
      <div className="bg-white flex justify-center items-center">
        <OnlineUser isCollapsed={collapsed} />
      </div>

      <Menu mode="inline" selectedKeys={asPath} defaultSelectedKeys={['/profile']} className="bg-white">
        {menu.map((mn) => (
          <Menu.Item
            key={mn.href}
            icon={mn.icon}
            onClick={() => {
              router.replace(mn.href)
            }}
          >
            {mn.name}
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  )
}

SliderLayout.propTypes = {
  collapsed: PropTypes.bool.isRequired,
}
export default SliderLayout
