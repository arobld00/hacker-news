import { useQuery } from 'react-query'
import getItem from '../services/getItem'
import Comments from '../components/Comments'

export default function Detail({ params }) {
  const { id } = params
  const { isLoading, isError, data, error } = useQuery('items', () => getItem({ id }))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const comments = data?.kids?.slice(0, 10) ?? []

  return (
    <Comments ids={comments}></Comments>
  )
}