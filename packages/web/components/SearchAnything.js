import { Input } from 'antd'

const { Search } = Input

const SearchAnything = () => {
  const onSearch = () => {
    //
  }
  return <Search placeholder="Search anything..." onSearch={onSearch} />
}

export default SearchAnything
