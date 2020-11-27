import React from 'react'
import SecurityLayout from 'layout/Security'
import PageLayout from 'layout/PageLayout'

const Dashboard = () => {
  return (
    <SecurityLayout employer>
      <PageLayout employer>
        <div>DASHboard</div>
      </PageLayout>
    </SecurityLayout>
  )
}

export default Dashboard
