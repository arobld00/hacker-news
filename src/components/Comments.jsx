import { useQuery } from 'react-query'
import getItem from '../services/getItem'

const Comment = ({ id }) => {
  const { isLoading, isError, data, error } = useQuery(`comment/${id}`, () => getItem({ id }))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const { by, text, time, kids } = data

  return (
    <>
      <article>
        <header>
          <small>
            <span>{by}</span>
            <span>4 hours ago</span>
          </small>
        </header>

        <p>{text}</p>
      </article>

      {kids?.length > 0 && <Comments ids={kids.slice(0, 10)}></Comments>}
    </>
  )
}

export default function Comments({ ids }) {
  return (
    <ul>
      {
        ids?.map((id) => (
          <li key={id}>
            <Comment id={id}></Comment>
          </li>
        ))
      }
    </ul>
  )
}