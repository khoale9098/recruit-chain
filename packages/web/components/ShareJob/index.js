import React from 'react'
import { Modal, message, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import { PaperClipOutlined } from '@ant-design/icons'

import { copyToClipboard } from 'utils'

const ShareJob = ({ show, cancel, userId, idJob }) => {
  const linkToJob = `${window.location.origin}/carrers/${idJob}?sharing=${userId}`

  const copyLinkToClipboard = () => {
    copyToClipboard(linkToJob)
    message.success('Copy to clipboard!')
  }

  return (
    <Modal title="Your personal link" footer={null} visible={show} onCancel={cancel}>
      <div>
        <p>
          Share this link with your friends and get WORK tokens. You will get tokens in any cases: Your friend comes to the
          interview Your friend gets a job offer and accepts it Information about current hiring status you can see in the
          Statistics. The payment occurs after the vacancy closing.
        </p>
      </div>
      <div className="my-4">
        <Input value={linkToJob} />
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button
          className="flex items-center rounded"
          type="primary"
          ghost
          icon={<PaperClipOutlined />}
          onClick={() => copyLinkToClipboard()}
        >
          Copy to clipboard
        </Button>
      </div>
    </Modal>
  )
}

ShareJob.propTypes = {
  show: PropTypes.bool,
  cancel: PropTypes.func,
  userId: PropTypes.string,
  idJob: PropTypes.string,
}
export default ShareJob
