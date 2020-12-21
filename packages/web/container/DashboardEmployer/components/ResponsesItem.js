import { Avatar, Button } from 'antd'
import PropTypes from 'prop-types'

import { UserOutlined, StepForwardOutlined, CloseCircleOutlined, DownSquareOutlined } from '@ant-design/icons'
import { useHover } from 'hooks/useHover'

const ResponsesItem = ({ item }) => {
  const [hoverRef, isHovered] = useHover()

  return (
    <div className="flex justify-between w-full" ref={hoverRef} style={{ minHeight: '150px' }}>
      <div className="w-full flex">
        <div className="flex-none mr-4">
          <Avatar
            size={48}
            src={item?.candidate?.avatar}
            className="flex justify-center items-center"
            icon={<UserOutlined />}
          />
        </div>
        <div className="flex flex-col w-full">
          <h3 className={`font-bold text-base  ${isHovered ? 'text-primary' : ''}`}>
            {`${item?.candidate?.firstName} ${item?.candidate?.lastName}`}
          </h3>
          <p className="font-semibold text-gray-700">{item?.job.title}</p>
          <div className="flex items-center text-gray-600">
            <div className="h-4 w-4">
              <img src="/img/icons/flagmap.png" alt="" />
            </div>
            <p className="ml-2  text-gray-600">{item?.candidate?.address || 'Ho Chi Minh City'}</p>
          </div>
          <div className=" text-gray-600">Competency: 0</div>
        </div>
      </div>

      <div style={{ width: '200px' }}>
        <Button icon={<StepForwardOutlined />} ghost type="primary" className="w-32 flex items-center cursor-pointer">
          Next Step
        </Button>
        <Button icon={<CloseCircleOutlined />} ghost type="primary" className="w-32 mt-2 flex items-center cursor-pointer">
          Reject
        </Button>
        <Button icon={<DownSquareOutlined />} ghost type="primary" className="w-32 mt-2 flex items-center cursor-pointer">
          Reverse List
        </Button>
      </div>
    </div>
  )
}

ResponsesItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
}
export default ResponsesItem
