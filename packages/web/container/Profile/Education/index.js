import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import ContainerProfile from 'components/ContainerProfile'
import { List } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'
import CardProfile from 'components/CardProfile'
import ModalAddEdit from './ModalAddEdit'

const GET_MY_EDUCATION = gql`
  query getMyEducation {
    getMyEducation {
      _id
      education {
        _id
        summary
        education_org
        degree
        media
        field_of_study
        startDate
        endDate
      }
    }
  }
`
const Education = () => {
  const [education, setEducation] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { data, loading, refetch } = useQuery(GET_MY_EDUCATION)
  return (
    <ContainerProfile isEdit={false} title="Education" showModal={() => setShowModal(true)}>
      <List
        className="w-full"
        loading={loading}
        dataSource={data?.getMyEducation?.education}
        renderItem={(item) => (
          <CardProfile
            // titleCard=" HCMC University of Technology and Education"
            titleCard={item?.education_org}
            imgCard="https://media-exp1.licdn.com/dms/image/C510BAQEaVrl7oCuRsg/company-logo_100_100/0?e=1612396800&v=beta&t=DIqbAkSTAW7VxvROkovQ234g5pYKmjsdRScaBBiF0pc"
          >
            <div className="flex flex-col relative w-full">
              <p>{item?.degree}</p>
              <p>{item?.field_of_study}</p>
              <div>{`${moment(item?.startDate).format('YYYY')} - ${moment(item?.endDate).format('YYYY')}`}</div>
              <EditOutlined
                className="text-gray-700 absolute cursor-pointer right-0 text-2xl pt-2 pr-4"
                onClick={() => {
                  setEducation(item)
                }}
              />
            </div>
          </CardProfile>
        )}
      />

      {education && (
        <ModalAddEdit show={!!education} cancel={() => setEducation(null)} education={education} isEdit refetch={refetch} />
      )}
      {showModal && <ModalAddEdit show={showModal} cancel={() => setShowModal(false)} refetch={refetch} />}
    </ContainerProfile>
  )
}

export default Education
