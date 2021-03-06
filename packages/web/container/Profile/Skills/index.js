import React from 'react'
import ContainerProfile from 'components/ContainerProfile'
import { useQuery, gql } from '@apollo/client'
import { Tag, Progress } from 'antd'

const GET_MY_SKILL = gql`
  query getMySkill {
    getMySkill {
      _id
      skill {
        title
        _id
        url
        attachment
        date_of_proof
        status
      }
    }
  }
`

const TAG = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}
const TAG_COLOR = {
  pending: 'blue',
  approved: 'green',
  rejected: 'red',
}
const Skills = ({ candidate }) => {
  const { data } = useQuery(GET_MY_SKILL)

  return (
    <ContainerProfile title="Skills" showIcon={false}>
      {candidate ? (
        <table className="w-full">
          <thead className="w-full  py-2">
            <tr>
              <th>Skill</th>
              <th>Date of proof</th>
              <th>Attached document</th>
              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ReactJS</td>
              <td />

              <td>https://reactjs.org/</td>
              <td>
                <Tag color="blue">Pending</Tag>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="w-full">
          <thead className="w-full  py-2">
            <tr>
              <th>Skill</th>
              <th>Date of proof</th>
              <th>Attached document</th>
              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {data?.getMySkill?.skill?.map((sk) => (
              <tr key={sk._id}>
                <td>{sk.title}</td>
                <td>{sk.date_of_proof}</td>
                <td>{sk.url}</td>
                <td>
                  <Tag color={TAG_COLOR[sk.status]}>{TAG[sk.status]}</Tag>
                </td>
                <td>{sk.attachment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </ContainerProfile>
  )
}

export default Skills
