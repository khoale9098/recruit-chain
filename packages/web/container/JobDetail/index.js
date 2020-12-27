/* eslint-disable react/no-danger */
import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Card, Spin, Modal, Button, message } from 'antd'
import { useRouter } from 'next/router'
import { SendOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

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

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      userType
    }
  }
`

const APPLY_JOB = gql`
  mutation applyJob($jobId: ID!, $companyId: ID!, $sharerId: ID) {
    applyJob(jobId: $jobId, companyId: $companyId, sharerId: $sharerId) {
      _id
    }
  }
`
const BoxJobContent = ({ title, content }) => {
  const createContent = (htmlContent) => {
    return { __html: htmlContent }
  }
  return (
    <article className="box-job ">
      <div className="px-10 m-xs:p-6">
        <div>
          <h2 className="uppercase font-bold text-base pb-3">{title}</h2>
          <div className="w-64" style={{ borderBottom: '0.5px solid rgba(229, 229, 229, 0.8)' }} />
          <div className="text-sm leading-7 pt-3 font-normal">
            <div dangerouslySetInnerHTML={createContent(content)} id="box-content" />
          </div>
        </div>
      </div>
    </article>
  )
}

BoxJobContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node,
}

const JobDetail = () => {
  const {
    query: { id, sharing },
  } = useRouter()

  const { data, loading } = useQuery(JOB, {
    variables: {
      id,
    },
  })

  const { data: cur } = useQuery(CURRENT_USER)

  const isEmployee = cur?.currentUser?.userType === 'employee'

  const [submitApplyJob] = useMutation(APPLY_JOB, {
    onCompleted() {
      message.success('Apply Job Successful!')
    },
  })

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <Spin />
      </div>
    )
  }

  const applyJob = () => {
    Modal.confirm({
      title: 'Share your profile?',
      okText: 'Apply',
      content: <div>Thông tin cá nhân</div>,
      cancelText: 'Cancel',
      onOk: () => {
        submitApplyJob({
          variables: { jobId: id, companyId: data?.job?.company?._id, sharerId: sharing },
        })
      },
    })
  }

  const renderApply = () => {
    return (
      <div className="flex">
        <Button
          className="bg-primary hover:bg-primary focus:bg-primary rounded outline-none focus:outline-none w-full h"
          style={{ height: '48px' }}
          onClick={() => applyJob()}
        >
          <div className="flex flex-row px-6 items-center mx-2">
            <div className="w-8 h-8 ">
              <img src="https://agecodehr.com/img/icons/approved.svg" alt="" />
            </div>
            <div className="text-white uppercase px-3">Apply</div>
          </div>
        </Button>
        <Button
          className="mx-4 border-primary uppercase text-primary rounded outline-none focus:outline-none w-full"
          style={{ height: '48px' }}
        >
          <SendOutlined className="text-xl" />
          Share
        </Button>
      </div>
    )
  }
  return (
    <Card title={<h3 className="text-lg font-bold">{data?.job?.title}</h3>} extra={isEmployee && renderApply()}>
      <div className="flex  m-md:flex-col m-xs:mx-4">
        <div className="w-full m-md:w-full pr-4 m-md:pr-0 m-md:m-auto">
          <div>
            <div className="pt-0">
              <BoxJobContent title="Description" content={data?.job?.description} />
            </div>
            {data?.job?.requirement && (
              <div className="mt-12">
                <BoxJobContent title="Requirment Skill and Experience" content={data?.job?.requirement} />
              </div>
            )}
            {data?.job?.benefit && (
              <div className="mt-12">
                <BoxJobContent title="Benefit" content={data?.job?.benefit} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default JobDetail
