import React from 'react'
import { Modal, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'

const REVIEW_USER = gql`
  mutation createReview($reviewInput: ReviewInput!) {
    createReview(reviewInput: $reviewInput) {
      _id
    }
  }
`
const ReviewModel = ({ show, cancel, userReviewId }) => {
  const [content, setContent] = React.useState('')
  const [reviewEmployee, { loading }] = useMutation(REVIEW_USER)

  const handleSendReview = async () => {
    if (content && userReviewId) {
      const reviewInput = {
        content,
        userId: userReviewId,
      }
      await reviewEmployee({
        variables: {
          reviewInput,
        },
      })
    }
  }
  return (
    <Modal footer={null} title="Review User" visible={show} onCancel={cancel}>
      <div>
        <Input.TextArea rows={6} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="mt-4">
        <div className="flex justify-end">
          <Button loading={loading} className="rounded" type="primary" onClick={() => handleSendReview()}>
            Review
          </Button>
        </div>
      </div>
    </Modal>
  )
}

ReviewModel.propTypes = {
  show: PropTypes.bool,
  // userReviewId: PropTypes.string,
  cancel: PropTypes.func,
}
export default ReviewModel
