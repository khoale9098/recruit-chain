import { Tag, Button } from 'antd'

const JobItem = () => {
  return (
    <div className="w-full relative mb-5">
      <div
        className="flex  h-full rounded-sm px-5 py-4 border border-solid"
        style={{ borderColor: '#e3e3e3', minHeight: '200px' }}
      >
        <div className="w-16">
          <img src="https://static.recruitery.co/uploads/images/c2a4be8f932c4ded85312e7889bb7662_20201016170539.jpg" alt="" />
        </div>
        <div className="pl-4">
          <h2 className="font-bold  text-sm">Software Engineer – PHP (Sign-on Bonus)</h2>
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
          <div className="mt-1">
            <Button className="rounded text-white font-semibold text-xs" style={{ background: '#5369f8' }}>
              +200,000 WORK
            </Button>
            <Button className="rounded text-white font-semibold text-xs" style={{ background: '#5369f8' }}>
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobItem
