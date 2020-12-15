import { Tag, Button } from 'antd'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import PropTypes from 'prop-types'
import { formatToken } from 'utils'
import { authAtoms } from 'store'

const JobItem = ({ item }) => {
  const { userType } = useRecoilValue(authAtoms.userPersisted)
  return (
    <Link className="w-full relative mb-5" href={`/job/${item?._id}`}>
      <div className="flex  h-full rounded-sm px-5 py-4 border border-solid" style={{ borderColor: '#e3e3e3' }}>
        <div className="w-16 flex-none">
          <img src={item?.company?.avatar} alt="" />
        </div>
        <div className="pl-4">
          <h2 className="font-bold cursor-pointer text-sm hover:text-blue-600">{item?.title}</h2>
          <p className="text-xs">{item?.location}</p>
          <div className="flex flex-wrap">
            {JSON.parse(item?.category).map((c) => (
              <Tag className="m-1" color="geekblue" key={c}>
                {c}
              </Tag>
            ))}
          </div>

          <div className="mt-1">
            <Button className="rounded text-white font-semibold text-xs" style={{ background: '#5369f8' }}>
              {`+${formatToken(item?.tokenBonus)} TOKEN`}
            </Button>
            {userType === 'employee' && (
              <Button className="rounded text-white font-semibold text-xs" style={{ background: '#5369f8' }}>
                Share
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

JobItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
}
export default JobItem
