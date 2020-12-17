import { useState } from 'react'
import { Avatar, Upload } from 'antd'
import { UserOutlined, EditOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useUpload } from 'hooks/useUpload'
import { upload as uploadAPI } from 'core/api'
import { beforeUpload } from 'utils'

const AvatarEmployee = ({ avatar, updateAvatar }) => {
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
          updateAvatar(url)
          setUpload(false)
        }
      } catch (e) {
        //
      }
    },
  })

  return (
    <>
      <div className="text-left shadow-md p-1 bg-white  relative" style={{ marginTop: '-104px', borderRadius: '50%' }}>
        <Avatar
          size={152}
          icon={<UserOutlined />}
          className="flex justify-center items-center"
          src={isUpload ? 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' : avatar}
        />
        <Upload
          {...uploadProps}
          showUploadList={false}
          beforeUpload={beforeUpload}
          className="absolute right-0 bottom-0 m-2 p-3 cursor-pointer"
        >
          <EditOutlined
            className="absolute right-0 bottom-0 m-2 p-3 bg-white shadow cursor-pointer"
            style={{ borderRadius: '50%' }}
          />
        </Upload>
      </div>
    </>
  )
}
AvatarEmployee.propTypes = {
  avatar: PropTypes.string,
  updateAvatar: PropTypes.func,
}
AvatarEmployee.defaultProps = {
  avatar: '',
  updateAvatar: () => {},
}

export default AvatarEmployee
