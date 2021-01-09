import React from 'react'
import CoverImage from 'container/Profile/CoverImage'
import { gql, useLazyQuery } from '@apollo/client'

import { Button, List, Card } from 'antd'
import PropTypes from 'prop-types'
import AvatarEmployee from 'container/Profile/AvatarEmployee'
import AboutUser from 'container/Profile/AboutUser'
import ResponseItem from 'container/Responses/ResponseItem'

import ReviewModel from '../ReviewModel'

const GET_REVIEW = gql`
  query getReviewById($userId: ID!) {
    getReviewById(userId: $userId) {
      _id
      review {
        _id
        content
        user {
          _id
        }
        creator {
          _id
        }
      }
    }
  }
`

const InformationView = ({ user }) => {
  const [showReview, setShowReview] = React.useState(false)
  const [loadReview, { data: review, loading: loadingReview }] = useLazyQuery(GET_REVIEW)

  React.useEffect(() => {
    if (user?._id) {
      loadReview({
        variables: {
          userId: user?._id,
        },
      })
    }
  }, [user?._id])

  const isEmployee = user?.userType === 'employee'
  return (
    <div className="w-full flex-1">
      <section className="overflow-visible bg-white rounded-sm shadow-md">
        <CoverImage coverImage={user?.coverImage} />
        <div className="px-6 pb-6 relative">
          <div className="flex">
            <AvatarEmployee avatar={user?.avatar} />
          </div>
          <div className="pt-2 flex justify-between">
            <div>
              <div className="font-bold text-2xl">
                {isEmployee ? `${user?.firstName} ${user?.lastName}` : user?.companyName}
              </div>
              <div>{user?.live || ''}</div>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="rounded"
              type="primary"
              onClick={() => {
                setShowReview(true)
              }}
            >
              Review
            </Button>
          </div>
        </div>
      </section>
      <AboutUser about={user?.about} isEmployee={isEmployee} review />
      <Card>
        <List
          loading={loadingReview}
          dataSource={review?.getReviewById?.review}
          renderItem={(item) => (
            <List.Item>
              <ResponseItem item={item} />
            </List.Item>
          )}
        />
      </Card>

      {/* {isEmployee && (
        <>
          {user?.skill?.length > 0 && <Skills />}
          <Education />
          <Experience />
        </>
      )} */}

      {showReview && <ReviewModel show={showReview} cancel={() => setShowReview(false)} userReviewId={user?._id} />}
    </div>
  )
}

InformationView.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
}
export default InformationView
