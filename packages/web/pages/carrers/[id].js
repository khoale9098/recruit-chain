import PageLayout from 'layout/PageLayout'
import Security from 'layout/Security'
import JobDetail from 'container/JobDetail'

const JobCarrers = () => {
  return (
    <Security>
      <PageLayout>
        <JobDetail />
      </PageLayout>
    </Security>
  )
}

export default JobCarrers
