import { useState } from 'react'
import { Tag, Button } from 'antd'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import PropTypes from 'prop-types'
import { formatToken } from 'utils'
import { authAtoms } from 'store'
import ShareJob from 'components/ShareJob'

const JobItem = ({ item }) => {
  const [showShare, setShowShare] = useState(false)

  const { userType } = useRecoilValue(authAtoms.userPersisted)
  return (
    <div
      className="flex  h-full rounded-sm px-5 py-4 border border-solid"
      style={{ borderColor: '#e3e3e3', minHeight: '200px' }}
    >
      <div className="w-16 flex-none">
        <img src={item?.company?.avatar} alt="" />
      </div>
      <div className="pl-4">
        <Link className="w-full relative mb-5" href={userType === 'employee' ? `carrers/${item?._id}` : `/job/${item?._id}`}>
          <a>
            <h2 className="font-bold cursor-pointer text-sm hover:text-blue-600">{item?.title}</h2>
          </a>
        </Link>
        <p className="text-xs">{item?.location}</p>
        <div className="flex flex-wrap">
          {JSON.parse(item?.category).map((c) => (
            <Tag className="m-1" color="geekblue" key={c}>
              {c}
            </Tag>
          ))}
        </div>

        <div className="mt-1 absolute bottom-0 pb-3 pr-4">
          <Button className="rounded text-white font-semibold text-xs" style={{ background: '#5369f8' }}>
            {`+${formatToken(item?.tokenBonus)} TOKEN`}
          </Button>
          {userType === 'employee' && (
            <Button
              className="rounded text-white font-semibold text-xs"
              style={{ background: '#5369f8' }}
              onClick={() => setShowShare(true)}
            >
              Share
            </Button>
          )}
        </div>
      </div>
      {showShare && <ShareJob show={showShare} cancel={() => setShowShare(false)} />}
    </div>
  )
}

JobItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
}
export default JobItem
