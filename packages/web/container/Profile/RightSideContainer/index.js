import { Tabs } from 'antd'
import Activity from '../Activity'
import SettingProfile from '../SettingProfile'

const { TabPane } = Tabs

const RightSideContainer = () => {
  return (
    <div className="w-full m-auto bg-white pb-8" style={{ maxWidth: '380px' }}>
      <Tabs className="w-full flex justify-between m-0 " defaultActiveKey="1">
        <TabPane tab="Activity" key="1">
          <Activity />
        </TabPane>
        <TabPane tab="Settings" key="2">
          <SettingProfile />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default RightSideContainer
