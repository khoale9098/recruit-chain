import React from 'react'
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

const JobContent = ({ data }) => {
  return (
    <section className="pt-10 pb-16">
      <div className="max-w-1135 m-auto">
        <div className="flex mt-6 m-md:flex-col m-xs:mx-4">
          <div className="w-2/3 m-md:w-full pr-4 m-md:pr-0 m-md:m-auto" style={{ maxWidth: '732px' }}>
            <div>
              <div className="pt-0">
                <BoxJobContent title="Mô tả công việc" content={data.description} />
              </div>
              {data.requirement && (
                <div className="pt-12">
                  <BoxJobContent title="Yêu cầu công việc" content={data.requirement} />
                </div>
              )}
              {data.benefit && (
                <div className="pt-12">
                  <BoxJobContent title="Chế độ phúc lợi" content={data.benefit} />
                </div>
              )}
            </div>
          </div>
          <div className="w-1/3 m-md:w-full">
            <div className="flex flex-col ml-4 m-md:mx-3">
              <div className="pt-10">
                <h3 className="font-bold text-xl leading-7 pb-3">Thông tin công ty</h3>
                <div className="w-64" style={{ borderBottom: '0.5px solid rgba(229, 229, 229, 0.8)' }} />
                {(data.company && (
                  <p
                    className="pt-3 font-normal leading-7 text-justify text-base"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: data.company?.description }}
                  />
                )) || (
                  <p className="pt-3 font-normal leading-7 text-justify text-base">
                    Là doanh nghiệp Nhật Bản đã bắt đầu đi vào quỹ đạo kinh doanh năm 1986. Cùng triết lý doanh nghiệp, “đóng
                    góp cho xã hội qua việc tạo ra những giá trị mới với ý kiến, công nghệ và sản phẩm sáng tạo”, công ty kinh
                    doanh các sản phẩm, dịch vụ đa dạng từ may mặc, quần áo, điện tử, xử lý nước, hàng hóa tiêu dùng, dụng cụ
                    đánh bắt cá, hợp nhựa tổng hợp đến vật liệu công nghiệp. Công ty đã từ từ khẳng định vị trí là công ty
                    chuyên sâu thương mại. Công ty đã lập ra mạng lưới toàn cầu bao gồm chi nhánh nội địa, quốc tế.
                  </p>
                )}
                <div className="flex flex-row items-center pt-3">
                  <div className="w-6 h-6">
                    <img src="/img/icons/flag.svg" alt="flagmap" />
                  </div>
                  <p className="italic pl-2 text-sm leading-4">{data.locations?.map((location) => location.name).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

JobContent.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default JobContent
