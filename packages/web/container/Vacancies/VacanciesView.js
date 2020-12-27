import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { Table, Space, Button, Popconfirm } from 'antd'
import { useRouter } from 'next/router'
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

const DELETE_JOB = gql`
  mutation deleteJob($id: ID!) {
    deleteJob(id: $id) {
      _id
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
  const router = useRouter()
  const { data, loading, refetch } = useQuery(GET_JOB_LIST)
  const [deleteVancancie] = useMutation(DELETE_JOB, {
    onCompleted() {
      refetch()
    },
  })

  const handleDelVancancie = async (id) => {
    await deleteVancancie({
      variables: {
        id,
      },
    })
  }

  const _renderAction = (item) => (
    <Space size="middle">
      <Button
        className="flex justify-center items-center"
        type="primary"
        icon={<EditOutlined />}
        onClick={() => router.push('my-vacancies/[id]', `my-vacancies/${item?._id}`)}
      />
      <Popconfirm
        placement="topLeft"
        title="Are you sure to delete this vancancie?"
        onConfirm={() => handleDelVancancie(item?._id)}
        okText="Yes"
        cancelText="No"
      >
        <Button
          className="text-white bg-red-600 border border-solid border-red-600 flex justify-center items-center"
          danger
          icon={<DeleteOutlined />}
        />
      </Popconfirm>
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

    {
      title: '',
      render: _renderAction,
    },
  ]

  return <Table loading={loading} dataSource={data?.getJobsById?.docs} columns={columns} rowKey="_id" />
}

export default VacanciesView
