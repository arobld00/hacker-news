import { useQuery } from 'react-query'
import getTopStories from '../services/getTopStories'

import Story from '../components/Story'

export default function TopStories() {
  const { isLoading, isError, data, error } = useQuery('stories', () => getTopStories({ page: 1, limit: 5 }))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <ul>
      {data?.map((id, index) => (
        <li key={id}>
          <Story id={id} index={index}></Story>
        </li>
      ))}
    </ul>
  )
}