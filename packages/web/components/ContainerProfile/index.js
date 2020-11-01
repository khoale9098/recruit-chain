import React from 'react'
import PropTypes from 'prop-types'

const ContainerProfile = ({ title, children }) => {
  return (
    <section className="bg-white p-6 my-4 shadow-md rounded-sm" style={{ transition: 'box-shadow 83ms' }}>
      <header className="text-lg font-semibold">{title}</header>
      <div className="mt-4">{children}</div>
    </section>
  )
}

ContainerProfile.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default ContainerProfile
