import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const ModalEditUser = ({ show, cancel }) => {
  return (
    <Modal visible={show} onCancel={cancel}>
      <div>1</div>
    </Modal>
  )
}

ModalEditUser.propTypes = {
  show: PropTypes.bool.isRequired,
  cancel: PropTypes.func,
}

export default ModalEditUser
