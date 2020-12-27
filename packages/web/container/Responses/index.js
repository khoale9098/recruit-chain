import React from 'react'
import { Card, List } from 'antd'
import ResponseItem from './ResponseItem'

const ResponsesUI = () => {
  const _renderTitle = () => (
    <div className="flex items-center">
      <div className="font-bold ">Responses</div>
      <p className="text-xs ml-2"> your responses</p>
    </div>
  )

  return (
    <Card title={_renderTitle()}>
      <List>
        <List.Item>
          <ResponseItem />
        </List.Item>
        <List.Item>
          <ResponseItem />
        </List.Item>
        <List.Item>
          <ResponseItem />
        </List.Item>
      </List>
    </Card>
  )
}

export default ResponsesUI
