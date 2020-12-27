import React from 'react'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

import {
  FormOutlined,
  AppstoreOutlined,
  SyncOutlined,
  ProjectOutlined,
  BarChartOutlined,
  DesktopOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
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

const SliderLayout = ({ collapsed, isEmployee = false }) => {
  const router = useRouter()
  const { asPath } = router

  const menuEmployee = [
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

  const menuCompany = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <DesktopOutlined />,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <FormOutlined />,
    },
    {
      name: 'Jobs',
      href: '/job',
      icon: <AppstoreOutlined />,
    },
    {
      name: 'My Vacancies',
      href: '/my-vacancies',
      icon: <ShoppingOutlined />,
    },
    {
      name: ' Statistics',
      href: '/statistic',
      icon: <BarChartOutlined />,
    },
  ]

  const menu = isEmployee ? menuEmployee : menuCompany

  return (
    <Layout.Sider className="bg-white" trigger={null} collapsible collapsed={collapsed}>
      <Logo />
      <div className="bg-white flex justify-center items-center">
        <OnlineUser isCollapsed={collapsed} isEmployee={isEmployee} />
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
  isEmployee: PropTypes.bool.isRequired,
}
export default SliderLayout
