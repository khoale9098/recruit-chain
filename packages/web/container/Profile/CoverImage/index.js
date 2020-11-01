import React from 'react'

const CoverImage = () => {
  return (
    <div className="m-0 p-0 border-none align-baseline bg-transparent">
      <div className="relative w-full" style={{ paddingBottom: '25%' }}>
        <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
          <img src="/img/cover.png" alt="" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export default CoverImage
