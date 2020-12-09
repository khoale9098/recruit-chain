import { Tag, Button } from 'antd'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { authAtoms } from 'store'

const JobItem = ({ item }) => {
  const { userType } = useRecoilValue(authAtoms.userPersisted)

  return (
    <Link className="w-full relative mb-5" href={`/job/${item?.slug}`}>
      <div className="flex  h-full rounded-sm px-5 py-4 border border-solid" style={{ borderColor: '#e3e3e3' }}>
        <div className="w-16">
          <img src="https://static.recruitery.co/uploads/images/c2a4be8f932c4ded85312e7889bb7662_20201016170539.jpg" alt="" />
        </div>
        <div className="pl-4">
          <h2 className="font-bold cursor-pointer text-sm">{item?.title}</h2>
          <p className="text-xs">Ho Chi Minh City</p>
          <div className="flex flex-wrap">
            <Tag className="m-1" color="geekblue">
              Software Development
            </Tag>
            <Tag className="m-1" color="geekblue">
              Data Warehousing
            </Tag>

            <Tag className="m-1" color="geekblue">
              UI/UX
            </Tag>
          </div>
          {userType === 'employee' && (
            <div className="mt-1">
              <Button className="rounded text-white font-semibold text-xs" style={{ background: '#5369f8' }}>
                +200,000 WORK
              </Button>
              <Button className="rounded text-white font-semibold text-xs" style={{ background: '#5369f8' }}>
                Share
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default JobItem
