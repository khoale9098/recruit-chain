import React from 'react'
import { Card } from 'antd'
import ApplyStatistic from './components/ApplyStatistic'
import ResponsesList from './components/ResponsesList'

const DashboardEmployer = () => {
  return (
    <Card>
      <div className="flex w-full" style={{ flex: '0 0 1/4' }}>
        <ApplyStatistic value={7} status="lala" />
        <ApplyStatistic value={7} status="lala" />
        <ApplyStatistic value={7} status="lala" />
        <ApplyStatistic value={7} status="lala" />
      </div>
      <div className="flex w-full mt-4">
        <div className="w-3/4">
          <ResponsesList />
        </div>
        <div className="w-1/4 mx-2">
          <div className="mr-2">
            <ApplyStatistic value={7} status="lala" />
          </div>
          <div className="mr-2 mt-4">
            <ApplyStatistic value={1} status="lala" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DashboardEmployer
