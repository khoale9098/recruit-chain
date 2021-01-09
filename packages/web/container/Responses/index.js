import React from 'react'
import { Card, List } from 'antd'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import ResponseItem from './ResponseItem'

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      _id
    }
  }
`

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
const ResponsesUI = () => {
  const { data: us, loading } = useQuery(CURRENT_USER)
  const [loadReview, { data: review, loading: loadingReview }] = useLazyQuery(GET_REVIEW)

  React.useEffect(() => {
    if (us?.currentUser?._id) {
      loadReview({
        variables: {
          userId: us?.currentUser?._id,
        },
      })
    }
  }, [us?.currentUser?._id])

  const _renderTitle = () => (
    <div className="flex items-center">
      <div className="font-bold ">Responses</div>
      <p className="text-xs ml-2"> your responses</p>
    </div>
  )

  return (
    <Card title={_renderTitle()}>
      <List
        loading={loading || loadingReview}
        dataSource={review?.getReviewById?.review}
        renderItem={(item) => (
          <List.Item>
            <ResponseItem item={item} />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default ResponsesUI
