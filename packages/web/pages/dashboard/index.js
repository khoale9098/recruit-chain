import React from 'react'
import SecurityLayout from 'layout/Security'
import PageLayout from 'layout/PageLayout'
import DashboardEmployer from 'container/DashboardEmployer'

const Dashboard = () => {
  return (
    <SecurityLayout employer>
      <PageLayout employer>
        <div>
          <DashboardEmployer />
        </div>
      </PageLayout>
    </SecurityLayout>
  )
}

export default Dashboard
