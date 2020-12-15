import PageLayout from 'layout/PageLayout'
import { useQuery, gql } from '@apollo/client'
import SecurityLayout from 'layout/Security'
import FormAddJob from 'container/Job/FormAddJob'

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
  const { data, loading } = useQuery(JOB, {
    variables: {
      id: '5fd83f38a1c72e12b42d48e4',
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
