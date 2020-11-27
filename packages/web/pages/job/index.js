import React from 'react'
import PageLayout from 'layout/PageLayout'
import SecurityLayout from 'layout/Security'
import CompanyJobUI from 'container/Job'

const Jobs = () => {
  return (
    <PageLayout>
      <SecurityLayout employer>
        <CompanyJobUI />
      </SecurityLayout>
    </PageLayout>
  )
}

export default Jobs
