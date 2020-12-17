import React from 'react'
import PropTypes from 'prop-types'

import { EditOutlined } from '@ant-design/icons'

const ContainerProfile = ({ title, children, showModal }) => {
  return (
    <section className="bg-white p-6 my-4 shadow-md rounded-sm relative" style={{ transition: 'box-shadow 83ms' }}>
      <EditOutlined className="text-gray-700 absolute right-0 text-2xl pt-2 pr-4" onClick={showModal} />
      <header className="text-lg font-semibold">{title}</header>
      <div className="mt-4">{children}</div>
    </section>
  )
}

ContainerProfile.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  showModal: PropTypes.func,
}

ContainerProfile.defaultProps = {
  showModal: () => {},
}
export default ContainerProfile
