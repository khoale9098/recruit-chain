import React from 'react'
import { Modal, message } from 'antd'
import PropTypes from 'prop-types'
import { FacebookOutlined, LinkedinOutlined, RedditOutlined, PaperClipOutlined } from '@ant-design/icons'

import { copyToClipboard } from 'utils'

const ShareJob = ({ show, cancel, userId, idJob }) => {
  const copyLinkToClipboard = (value) => {
    copyToClipboard(value)
    message.success('Copy to clipboard!')
  }
  return (
    <Modal title="Share" footer={null} visible={show} onCancel={cancel}>
      <div className="flex">
        <FacebookOutlined className="text-6xl mx-4 hover:text-blue-700 cursor-pointer" />
        <LinkedinOutlined className="text-6xl  mx-4 hover:text-blue-700 cursor-pointer" />
        <RedditOutlined className="text-6xl  mx-4 hover:text-blue-700 cursor-pointer" />
        <PaperClipOutlined
          className="text-6xl mx-4 hover:text-blue-700 cursor-pointer"
          onClick={() => copyLinkToClipboard('hiihihihihiihihihihi')}
        />
      </div>
    </Modal>
  )
}

ShareJob.propTypes = {
  show: PropTypes.bool,
  cancel: PropTypes.func,
}
export default ShareJob
