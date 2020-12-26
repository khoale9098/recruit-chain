import React from 'react'
import PageLayout from 'layout/PageLayout'
import SecurityLayout from 'layout/Security'
import VancanciesUI from 'container/Vacancies'

const MyVacancies = () => {
  return (
    <PageLayout>
      <SecurityLayout employer>
        <VancanciesUI />
      </SecurityLayout>
    </PageLayout>
  )
}

export default MyVacancies
