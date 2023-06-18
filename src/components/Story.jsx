import { Link } from 'wouter'
import { useQuery } from 'react-query'
import getItem from '../services/getItem'

export default function Story({ id, index }) {
  const { isLoading, isError, data, error } = useQuery(`/story/${id}`, () => getItem({ id }))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const { by, kids, score, title, url } = data

  let domain = ''
  try {
    domain = new URL(url).hostname.replace('wwww.', '')
  } catch { }

  return (
    <article>
      <header>
        <small>{index}. </small>
        <a href={url} target='_blank' rel='noopener noreferrer'>{title}</a>
        <a href={url} target='_blank' rel='noopener noreferrer'>({domain})</a>
      </header>
      <footer>
        <span>{score} points</span>
        <Link href={`/article/${id}`}>
          by {by}
        </Link>
        <Link href={`/article/${id}`}>
          6 hours ago
        </Link>
        <Link href={`/article/${id}`}>
          {kids?.length ?? 0} comments
        </Link>
      </footer>
    </article>
  )
}