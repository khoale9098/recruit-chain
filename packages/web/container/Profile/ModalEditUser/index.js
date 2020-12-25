import React from 'react'
import PropTypes from 'prop-types'
import { pickBy, identity } from 'lodash'
import { Modal, Form, Input, Button } from 'antd'

const FIELD_NAME = {
  COMPANY_NAME: 'companyName',
  ADDRESS: 'live',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
}
const ModalEditUser = ({ show, cancel, updateUser, user }) => {
  const [form] = Form.useForm()

  const onSubmit = (values) => {
    const inputValues = pickBy(values, identity)
    updateUser({
      variables: {
        userInput: inputValues,
      },
    })
  }
  return (
    <Modal form={form} visible={show} onCancel={cancel} footer={null}>
      <div className="w-full mt-8">
        <Form layout="vertical" onFinish={onSubmit} initialValues={user}>
          {user?.userType === 'employer' ? (
            <Form.Item label="Company name" name={FIELD_NAME.COMPANY_NAME}>
              <Input />
            </Form.Item>
          ) : (
            <>
              <Form.Item label="First Name" name={FIELD_NAME.FIRST_NAME}>
                <Input />
              </Form.Item>
              <Form.Item label="Last Name" name={FIELD_NAME.LAST_NAME}>
                <Input />
              </Form.Item>
            </>
          )}
          <Form.Item label="Address" name={FIELD_NAME.ADDRESS}>
            <Input />
          </Form.Item>
          <div className="flex justify-end">
            <Form.Item>
              <Button type="primary" className="px-12" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

ModalEditUser.propTypes = {
  show: PropTypes.bool.isRequired,
  cancel: PropTypes.func,
  updateUser: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.any),
}

export default ModalEditUser
