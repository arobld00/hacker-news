//import { useQuery } from 'react-query'
import { useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import getTopStories from '../services/getTopStories'

import Story from '../components/Story'

import useIntersectionObserver from '../hooks/useIntersectionObserver'

export default function TopStories() {
  //const { isLoading, isError, data, error } = useQuery('stories', () => getTopStories({ page: 1, limit: 5 }))
  const topStories = async ({ page, limit = 5 }) => {
    return await getTopStories({ page, limit })
  }

  const {
    isLoading,
    isFetchingMore,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    fetchMore,
    canFetchMore,
    isFetchingNextPage
  } = useInfiniteQuery(
    'projects',
    ({ pageParam = 1 }) => topStories({ page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return nextPage
      }
    }
  )

  const loadMoreButtonRef = useRef()

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore,
    enabled: canFetchMore,
  })

  console.log(data)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <ul>
        {data?.pages.map((page) => (
          page.map((id, index) => (
            <li key={id}>
              <Story id={id} index={index}></Story>
            </li>
          ))
        ))}
      </ul>
      <button
        ref={loadMoreButtonRef}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingMore
          ? 'Loading more...'
          : canFetchMore
            ? 'Load More'
            : 'Nothing more to load'}
      </button>
    </>
  )
}