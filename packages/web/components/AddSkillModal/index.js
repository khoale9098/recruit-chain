import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal, Form, Input, Space, Button, message } from 'antd'
import PropTypes from 'prop-types'
import { FileTextOutlined } from '@ant-design/icons'

const SKILL_FIELD = {
  TITLE: 'title',
  ATTACHMENT: 'attachment',
  URL: 'url',
}

const ADD_SKILL = gql`
  mutation createSkill($skillInput: SkillInput!) {
    createSkill(skillInput: $skillInput) {
      _id
    }
  }
`
const AddSkillModal = ({ show, cancel }) => {
  const [submitAddSkill] = useMutation(ADD_SKILL, {
    onCompleted() {
      message.success('Add Skill Successful!')
    },
  })
  const onSubmit = async (values) => {
    await submitAddSkill({
      variables: {
        skillInput: values,
      },
    })
  }

  return (
    <Modal title="Skill Add" visible={show} onCancel={cancel} footer={null}>
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item label="Skill Title" required name={SKILL_FIELD.TITLE}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Provide confirmation info via URL-Address on your certificate, video, etc"
          name={SKILL_FIELD.URL}
          required
        >
          <Input />
        </Form.Item>
        {/* <Form.Item label="Please Attach file">
          <Upload>
            <Button icon={<FileTextOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}
        <div className="flex justify-end items-center">
          <Space>
            <Form.Item>
              <Button className="rounded" onClick={cancel}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" className="rounded">
                Send to moderation
              </Button>
            </Form.Item>
          </Space>
        </div>
      </Form>
    </Modal>
  )
}

AddSkillModal.propTypes = {
  show: PropTypes.bool,
  cancel: PropTypes.func,
}
export default AddSkillModal
