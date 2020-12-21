import { List, Card } from 'antd'
import PropTypes from 'prop-types'
import ResponsesItem from './ResponsesItem'

const ResponsesList = ({ candidate, loading, refetchCount }) => {
  return (
    <div className="mx-2 px-4">
      <Card>
        <List
          dataSource={candidate}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <ResponsesItem item={item} refetchCount={refetchCount} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
ResponsesList.propTypes = {
  candidate: PropTypes.arrayOf(PropTypes.object),
  refetchCount: PropTypes.func,
  loading: PropTypes.bool,
}

export default ResponsesList
