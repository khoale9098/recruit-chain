import React from 'react'
import PageLayout from 'layout/PageLayout'
import SecurityLayout from 'layout/Security'
import ResponsesUI from 'container/Responses'

const Responses = () => {
  return (
    <PageLayout>
      <SecurityLayout>
        <ResponsesUI />
      </SecurityLayout>
    </PageLayout>
  )
}

export default Responses
