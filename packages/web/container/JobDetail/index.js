/* eslint-disable react/no-danger */
import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Link from 'next/link'
import { Card, Spin, Modal, Button, message } from 'antd'
import { useRouter } from 'next/router'
import { SendOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import ShareJob from 'components/ShareJob'

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
      candidate {
        _id
      }
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
      _id
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
  const [showShare, setShowShare] = React.useState(false)

  const { data, loading } = useQuery(JOB, {
    variables: {
      id,
    },
  })

  const { data: cur } = useQuery(CURRENT_USER)

  const isEmployee = cur?.currentUser?.userType === 'employee'

  const [submitApplyJob] = useMutation(APPLY_JOB, {
    onCompleted() {
      message.success('Your response has been sent!!')
    },
    onError() {
      message.error('You have applied for this job!')
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
          variables: { jobId: id, companyId: data?.job?.company?._id, sharerId: sharing || cur?.currentUser?._id },
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
            <div className="text-white font-semibold px-3">Apply Now</div>
          </div>
        </Button>
        <Button
          icon={<SendOutlined className="text-xl" />}
          className="mx-4 flex items-center border-primary  text-primary rounded outline-none focus:outline-none w-full"
          style={{ height: '47px' }}
          onClick={() => setShowShare(true)}
        >
          <div className="px-2 font-semibold"> Recommend for a job</div>
        </Button>
      </div>
    )
  }

  const Title = () => {
    return (
      <div className="flex">
        <div>
          <Link href={`/profile_view/${data?.job?.company?._id}`}>
            <div className="cursor-pointer" style={{ width: '128px', height: '128px' }}>
              <img
                style={{ width: '128px', height: '128px' }}
                className="rounded-md box-border bg-clip-border"
                src={data?.job?.company?.avatar}
                alt="company"
              />
            </div>
          </Link>
        </div>
        <div className="flex flex-col ml-4">
          <h3 className="text-xl font-semibold">{data?.job?.title}</h3>
          <div className="flex mt-2 items-center" style={{ color: 'rgba(0,0,0,.6)' }}>
            <span>{data?.job?.company?.companyName}</span>
            <span className="px-2"> - </span>
            <p>{data?.job?.location}</p>
          </div>
          <p>{`${data?.job?.candidate?.length} applicants`}</p>
        </div>
      </div>
    )
  }
  return (
    <Card title={<Title />} extra={isEmployee && renderApply()}>
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
      {showShare && <ShareJob show={showShare} cancel={() => setShowShare(false)} userId={cur?.currentUser?._id} idJob={id} />}
    </Card>
  )
}

export default JobDetail
