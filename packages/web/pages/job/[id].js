import PageLayout from 'layout/PageLayout'
import SecurityLayout from 'layout/Security'
import API from 'core/api/API'
import { useRouter } from 'next/router'
import { fetcher } from 'core/api'
import useSWR from 'swr'
import JobDetail from 'container/JobDetail'

const Jobs = () => {
  const router = useRouter()
  const { data } = useSWR(API.JOB.DETAIL.replace('{slug}', router.query.id), fetcher)
  return (
    <PageLayout>
      <SecurityLayout employer>
        <JobDetail data={data?.job} />
      </SecurityLayout>
    </PageLayout>
  )
}

export default Jobs
