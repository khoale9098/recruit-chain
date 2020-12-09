import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'

const BoxJobContent = ({ title, content }) => {
  const createContent = (htmlContent) => {
    return { __html: htmlContent }
  }
  return (
    <article className="box-job ">
      <div className="p-10 m-xs:p-6">
        <div>
          <h2 className="uppercase font-bold text-2xl pb-3">{title}</h2>
          <div className="w-64" style={{ borderBottom: '0.5px solid rgba(229, 229, 229, 0.8)' }} />
          <div className="text-base leading-7 pt-3 font-normal">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={createContent(content)} id="box-content" />
          </div>
        </div>
      </div>
    </article>
  )
}

BoxJobContent.propTypes = {
  title: PropTypes.string.isRequired,
}

const JobDetail = ({ data }) => {
  return (
    <Card>
      <div className="flex mt-6 m-md:flex-col m-xs:mx-4">
        <div className="w-full m-md:w-full pr-4 m-md:pr-0 m-md:m-auto" style={{ maxWidth: '732px' }}>
          <div>
            <div className="pt-0">
              <BoxJobContent title="Mô tả công việc" content={data?.description} />
            </div>
            {data?.requirement && (
              <div className="pt-12">
                <BoxJobContent title="Yêu cầu công việc" content={data?.requirement} />
              </div>
            )}
            {data?.benefit && (
              <div className="pt-12">
                <BoxJobContent title="Chế độ phúc lợi" content={data?.benefit} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default JobDetail
