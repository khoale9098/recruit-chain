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
          <div className="mx-4 px-2 my-2 " style={{ paddingTop: '72px' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageLayout
