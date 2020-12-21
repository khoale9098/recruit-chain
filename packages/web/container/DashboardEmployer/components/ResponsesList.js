import { List, Card } from 'antd'
import PropTypes from 'prop-types'
import ResponsesItem from './ResponsesItem'

const ResponsesList = ({ candidate, loading }) => {
  return (
    <div className="mx-2 px-4">
      <Card>
        <List
          dataSource={candidate}
          loading={loading}
          renderItem={(item) => (
            <List.Item>
              <ResponsesItem item={item} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
ResponsesList.propTypes = {
  candidate: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
}

export default ResponsesList
