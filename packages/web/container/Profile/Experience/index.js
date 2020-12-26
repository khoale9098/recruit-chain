import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { List } from 'antd'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import ContainerProfile from 'components/ContainerProfile'
import CardProfile from 'components/CardProfile'
import ModalAddEditExp from './ModalAddEditExp'

const GET_MY_EXPERIENCE = gql`
  query getMyExperience {
    getMyExperience {
      _id
      experience {
        _id
        companyName
        job_title
        employment_type
        location
        description
        media
        startDate
        endDate
      }
    }
  }
`
const Experience = () => {
  const [experience, setExperience] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const { data, loading, refetch } = useQuery(GET_MY_EXPERIENCE)

  return (
    <ContainerProfile title="Total Work Experience" isEdit={false} showModal={() => setShowModal(true)}>
      <List
        className="w-full"
        loading={loading}
        dataSource={data?.getMyExperience?.experience}
        renderItem={(item) => (
          <CardProfile
            titleCard={item?.job_title}
            imgCard="https://media-exp1.licdn.com/dms/image/C4D0BAQEd92am3bw1ng/company-logo_100_100/0?e=1612396800&v=beta&t=UzLDjOerebMfhkOHqfeSihXagQrOk97Va7_AkU5Ullk"
          >
            <div className="flex flex-col relative w-full">
              <p>{item?.companyName}</p>
              <div style={{ color: 'rgba(0,0,0,.6)' }}>
                <div>{`${moment(item?.startDate).format('MMM YYYY')} - ${moment(item?.endDate).format('MMM YYYY')}`}</div>
                <span>{item?.location}</span>
              </div>
              <p className="pt-2">{item?.description}</p>
              <EditOutlined
                className="text-gray-700 absolute cursor-pointer right-0 text-2xl pt-2 pr-4"
                onClick={() => {
                  setExperience(item)
                }}
              />
            </div>
          </CardProfile>
        )}
      />
      {experience && (
        <ModalAddEditExp
          show={!!experience}
          cancel={() => setExperience(null)}
          experience={experience}
          isEdit
          refetch={refetch}
        />
      )}
      {showModal && <ModalAddEditExp show={showModal} cancel={() => setShowModal(false)} refetch={refetch} />}
    </ContainerProfile>
  )
}

export default Experience
