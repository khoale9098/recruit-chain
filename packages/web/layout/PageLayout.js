import React, { useState } from 'react'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

import SliderLayout from './Slider'
import HeaderLayout from './Header'

const { Content } = Layout

const PageLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="w-full h-screen">
      <SliderLayout collapsed={collapsed} />
      <Layout className="site-layout">
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="site-layout-background">
          <div className="flex bg-white items-center shadow-xs">
            <h3 className="font-bold text-lg py-4 pl-3"> Your Profile</h3>
            <div className="pl-4 text-gray-600">was online at 01-11-2020 at 12:32:37</div>
          </div>
          <div className="ml-4 my-2 ">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
