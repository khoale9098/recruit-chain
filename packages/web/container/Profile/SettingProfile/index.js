import React from 'react'
import { Card, Form, Input, Button, message } from 'antd'
import { PaperClipOutlined } from '@ant-design/icons'
import { copyToClipboard } from 'utils'

const SettingProfile = () => {
  const shareReferral = (link) => {
    copyToClipboard(link)
    message.success('Copy To Clipboard!')
  }

  const _renderCopy = () => (
    <PaperClipOutlined className="text-primary" onClick={() => shareReferral('https://app.aworker.io/register?ref=25241')} />
  )
  return (
    <div className="flex flex-col">
      <Card title={<div className="font-semibold">Security</div>}>
        <Form layout="vertical">
          <Form.Item label="Change Password">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Please re-type a password">
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
