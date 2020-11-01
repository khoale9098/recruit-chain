import React from 'react'
import { Avatar } from 'antd'
import PropTypes from 'prop-types'

const CardProfile = ({ imgCard, titleCard, children }) => {
  return (
    <div style={{ padding: '20px 72px 0 0' }}>
      <div className="flex w-full justify-between">
        <div className="flex ">
          <div className="flex-none">
            <Avatar src={imgCard} size={56} shape="square" className="flex-none flex justify-center items-center" />
          </div>
          <div className="ml-4">
            <div className="pt-2 pb-8">
              <h3 className="font-bold text-base leading-none pb-1">{titleCard}</h3>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CardProfile.propTypes = {
  imgCard: PropTypes.string,
  titleCard: PropTypes.string,
}
CardProfile.defaultProps = {
  imgCard: '',
  titleCard: '',
}
export default CardProfile
