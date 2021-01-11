import React from 'react'
import { Card, Form, Input, Button, message } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import { useMutation, gql, useApolloClient } from '@apollo/client'

import { logout } from 'core/api'
import { copyToClipboard } from 'utils'

const CHANGE_PASSWORD = gql`
  mutation changePassword($oldPassword: String, $newPassword: String) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`

const SettingProfile = () => {
  const client = useApolloClient()

  const onLogout = async () => {
    client.cache.gc()
    await logout()
  }

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      onLogout()
    },
    onError() {
      message.error('Change password error!')
    },
  })

  const shareReferral = (link) => {
    copyToClipboard(link)
    message.success('Copy To Clipboard!')
  }
  const validationRules = {
    newPassword: [
      {
        required: true,
      },
    ],
    rePassword: [
      ({ getFieldValue }) => ({
        validator(_, value) {
          const isMatch = getFieldValue('newPassword') === value

          if (isMatch) {
            return Promise.resolve()
          }

          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('Please enter re-password')
        },
      }),
    ],
  }

  const onsubmit = async (values) => {
    const { oldPassword, newPassword } = values
    await changePassword({
      variables: {
        oldPassword,
        newPassword,
      },
    })
  }

  const _renderCopy = () => (
    <PaperClipOutlined className="text-primary" onClick={() => shareReferral('https://app.aworker.io/register?ref=25241')} />
  )

  return (
    <div className="flex flex-col">
      <Card title={<div className="font-semibold">Email</div>}>
        <Form layout="vertical">
          <Form.Item label="Email" name="email">
            <Input value="khoale9098@gmail.com" />
          </Form.Item>
        </Form>
      </Card>
      <Card title={<div className="font-semibold">Security</div>}>
        <Form layout="vertical" onFinish={onsubmit}>
          <Form.Item label="Old Password" name="oldPassword" rules={validationRules.newPassword}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Change Password" name="newPassword" rules={validationRules.newPassword}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Please re-type a password" name="rePassword" rules={validationRules.rePassword}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={<div className="font-semibold">Referral program</div>}>
        <div className="my-2">Please send this URL to your friends!</div>
        <Input value="https://app.aworker.io/register?ref=25241" suffix={_renderCopy()} />
      </Card>
    </div>
  )
}
export default SettingProfile
