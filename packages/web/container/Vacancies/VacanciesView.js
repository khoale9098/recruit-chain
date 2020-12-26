import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Table, Space, Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const GET_JOB_LIST = gql`
  query getJobsById {
    getJobsById {
      totalDocs
      page
      totalPages
      docs {
        _id
        createdAt
        updatedAt
        company {
          _id
          avatar
          companyName
        }
        tokenBonus
        title
        salaryFrom
        salaryTo
        location
        vacancies
        expiredAt
        category
      }
    }
  }
`

const FIELD_VACANCIES = {
  TITLE: 'title',
  ID: '_id',
  SALARY_FROM: 'salaryFrom',
  SALARY_TO: 'salaryTo',
  TOKEN_FOR_CLOSING: 'tokenBonus',
  STATUS: 'status',
}

const VacanciesView = () => {
  const { data, loading } = useQuery(GET_JOB_LIST)
  const _renderAction = () => (
    <Space size="middle">
      <Button className="flex justify-center items-center" type="primary" onClick={() => {}} icon={<EditOutlined />} />
      <Button
        className="text-white bg-red-600 border border-solid border-red-600 flex justify-center items-center"
        danger
        icon={<DeleteOutlined />}
      />
    </Space>
  )
  const columns = [
    {
      title: 'Title',
      dataIndex: FIELD_VACANCIES.TITLE,
      key: FIELD_VACANCIES.TITLE,
    },
    {
      title: 'ID',
      dataIndex: FIELD_VACANCIES.ID,
      key: FIELD_VACANCIES.ID,
    },
    {
      title: 'Salary From',
      dataIndex: FIELD_VACANCIES.SALARY_FROM,
      key: FIELD_VACANCIES.SALARY_FROM,
    },
    {
      title: 'Salary To',
      dataIndex: FIELD_VACANCIES.SALARY_FROM,
      key: FIELD_VACANCIES.SALARY_FROM,
    },
    {
      title: 'Token for closing the vacancy',
      dataIndex: FIELD_VACANCIES.TOKEN_FOR_CLOSING,
      key: FIELD_VACANCIES.TOKEN_FOR_CLOSING,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    // },
    {
      title: '',
      render: _renderAction,
    },
  ]

  return <Table loading={loading} dataSource={data?.getJobsById?.docs} columns={columns} rowKey="_id" />
}

export default VacanciesView
