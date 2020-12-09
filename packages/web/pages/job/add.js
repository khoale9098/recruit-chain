import PageLayout from 'layout/PageLayout'
import SecurityLayout from 'layout/Security'
import FormAddJob from 'container/Job/FormAddJob'

const AddJob = () => {
  return (
    <PageLayout>
      <SecurityLayout employer>
        <FormAddJob />
      </SecurityLayout>
    </PageLayout>
  )
}

export default AddJob
