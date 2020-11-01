import { Tabs } from 'antd'
import Activity from '../Activity'

const { TabPane } = Tabs

const RightSideContainer = () => {
  function callback(key) {
    console.log(key)
  }

  return (
    <div className="w-full">
      <Tabs
        className="w-full flex justify-between m-0 "
        tabBarStyle={{ width: '100%', margin: 0 }}
        defaultActiveKey="1"
        onChange={callback}
        centered
      >
        <TabPane tab="Activity" key="1">
          <Activity />
        </TabPane>
        <TabPane tab="Profile" key="2">
          <Activity />
        </TabPane>
        <TabPane tab="Settings" key="3">
          <Activity />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default RightSideContainer
