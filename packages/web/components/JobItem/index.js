import { useState } from 'react'
import { Tag, Button } from 'antd'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import PropTypes from 'prop-types'
import { formatToken } from 'utils'
import moment from 'moment'
import { authAtoms } from 'store'
import { ShareAltOutlined } from '@ant-design/icons'
import ShareJob from 'components/ShareJob'

const JobItem = ({ item }) => {
  const [showShare, setShowShare] = useState(false)

  const { userType, userId } = useRecoilValue(authAtoms.userPersisted)
  return (
    <div className="rounded-sm px-5 py-4" style={{ border: '1px solid #eef1f2' }}>
      <div className="flex re  h-full" style={{ borderColor: '#e3e3e3', minHeight: '150px' }}>
        <div className="w-16 flex-none">
          <img src={item?.company?.avatar} alt="" />
        </div>
        <div className="pl-4 relative">
          <Link className="w-full relative mb-5" href={userType === 'employee' ? `carrers/${item?._id}` : `/job/${item?._id}`}>
            <a>
              <h2 className="font-bold cursor-pointer text-base hover:text-blue-600">{item?.title}</h2>
            </a>
          </Link>
          <div className="flex ">
            <div className="h-4 w-4">
              <img src="/img/icons/flagmap.png" alt="" />
            </div>
            <p className="text-xs ml-2">{item?.location}</p>
          </div>
          <div className="py-2">
            <Tag className="rounded font-semibold text-xs border border-primary bg-primary text-white">
              {`+${formatToken(item?.tokenBonus)} TOKEN`}
            </Tag>
          </div>
          <div style={{ color: '#bbb' }}>{`Published at: ${moment(item?.createdAt).format('DD/MM/YYYY')}`}</div>
        </div>
        {showShare && <ShareJob show={showShare} cancel={() => setShowShare(false)} userId={userId} idJob={item?._id} />}
      </div>
      <div className="w-full flex justify-between pt-4" style={{ borderTop: '1px solid #eef1f2' }}>
        {userType === 'employee' && (
          <Button
            type="link"
            className="rounded text-primary font-bold flex items-center"
            onClick={() => setShowShare(true)}
            icon={<ShareAltOutlined />}
          >
            Recommend for a job
          </Button>
        )}
        <Link className="w-full relative mb-5" href={userType === 'employee' ? `carrers/${item?._id}` : `/job/${item?._id}`}>
          <a>
            <Button ghost type="primary" className="rounded hover:text-white hover:bg-primary">
              More
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

JobItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
}
export default JobItem
