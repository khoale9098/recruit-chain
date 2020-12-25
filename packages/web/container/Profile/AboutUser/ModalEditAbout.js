import { useState } from 'react'
import { Modal, Input } from 'antd'
import PropTypes from 'prop-types'

const ModalEditAbout = ({ show, cancel, updateUser, about }) => {
  const [aboutText, setAboutText] = useState('')
  const onChange = (ev) => {
    setAboutText(ev.target.value)
  }

  const onUpdateAbout = async () => {
    if (aboutText && aboutText.trim()) {
      const res = await updateUser({
        variables: {
          userInput: {
            about: aboutText,
          },
        },
      })
      if (res) cancel()
    } else {
      cancel()
    }
  }
  return (
    <Modal visible={show} onCancel={cancel} title="Edit About User" onOk={onUpdateAbout}>
      <div className="py-2 ">
        <Input.TextArea
          defaultValue={about}
          onChange={onChange}
          autoSize={{ minRows: 4, maxRows: 8 }}
          className="resize-none"
        />
      </div>
    </Modal>
  )
}

ModalEditAbout.propTypes = {
  show: PropTypes.bool,
  about: PropTypes.string,
  cancel: PropTypes.func,
  updateUser: PropTypes.func,
}

export default ModalEditAbout
