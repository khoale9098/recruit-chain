import { useState } from 'react'
import { Upload, Spin } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useUpload } from 'hooks/useUpload'
import { upload as uploadAPI } from 'core/api'
import { beforeUpload } from 'utils'

const CoverImage = ({ coverImage, updateCoverImage }) => {
  const [isUpload, setUpload] = useState(false)

  const { uploadProps } = useUpload([], {
    limit: 1,
    afterLoadFile: async (file) => {
      try {
        setUpload(true)
        const { upload, url } = await uploadAPI({ file })
        if (!upload || !upload.type) {
          throw new Error('ERROR: UPLOAD_FAIL')
        } else {
          updateCoverImage(url)
          setUpload(false)
        }
      } catch (e) {
        //
      }
    },
  })

  return (
    <div className="m-0 p-0 border-none align-baseline bg-transparent">
      <div className="relative w-full" style={{ paddingBottom: '25%' }}>
        <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
          {isUpload ? (
            <div className="border border-solid border-gray-300 w-full h-full flex justify-center items-center">
              <Spin />
            </div>
          ) : (
            <img src={coverImage} alt="" className="object-cover w-full h-full" />
          )}
        </div>
        <Upload
          {...uploadProps}
          showUploadList={false}
          beforeUpload={beforeUpload}
          className="absolute right-0 top-0 m-2 p-3 cursor-pointer"
        >
          <EditOutlined
            className="absolute right-0 bottom-0 m-2 p-3 bg-white shadow cursor-pointer"
            style={{ borderRadius: '50%' }}
          />
        </Upload>
      </div>
    </div>
  )
}

CoverImage.propTypes = {
  coverImage: PropTypes.string,
  updateCoverImage: PropTypes.func,
}
export default CoverImage
