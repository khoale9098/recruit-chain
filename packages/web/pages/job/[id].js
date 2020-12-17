import PageLayout from 'layout/PageLayout'
import { useQuery, gql } from '@apollo/client'
import SecurityLayout from 'layout/Security'
import FormAddJob from 'container/Job/FormAddJob'
import { useRouter } from 'next/router'

const JOB = gql`
  query job($id: ID!) {
    job(id: $id) {
      _id
      createdAt
      updatedAt
      company {
        _id
        avatar
        companyName
      }
      requirement
      benefit
      tokenBonus
      title
      salaryFrom
      salaryTo
      location
      vacancies
      description
      expiredAt
      category
    }
  }
`
const Jobs = () => {
  const {
    query: { id },
  } = useRouter()

  const { data, loading } = useQuery(JOB, {
    variables: {
      id,
    },
  })
  if (loading) return 'loading'
  return (
    <PageLayout>
      <SecurityLayout employer>
        <FormAddJob isEdit job={data?.job} />
      </SecurityLayout>
    </PageLayout>
  )
}

export default Jobs
