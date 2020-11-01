import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchAnything = () => {
  return (
    <Input
      size="large"
      className="px-4 text-gray-500 text-sm rounded w-4/5 "
      style={{ height: '70%' }}
      // placeholder="Search anything..."
      // onSearch={onSearch}
      prefix={<SearchOutlined />}
    />
  )
}

export default SearchAnything
