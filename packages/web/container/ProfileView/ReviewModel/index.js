import React from 'react'
import { Modal, Input } from 'antd'
import PropTypes from 'prop-types'

const ReviewModel = ({ show, cancel }) => {
  return (
    <Modal title="Review User" visible={show} onCancel={cancel}>
      <div>
        <Input.TextArea />
      </div>
    </Modal>
  )
}

ReviewModel.propTypes = {
  show: PropTypes.bool,
  cancel: PropTypes.func,
}
export default ReviewModel
