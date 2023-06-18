import { useState, useEffect, Suspense, lazy } from 'react'
import Header from './Header'
import { Route } from 'wouter'

const TopStories = lazy(() => import('./components/TopStories'))
const Detail = lazy(() => import('./components/Detail'))

export default function App() {
  const [stories, setStories] = useState({
    isLoading: false,
    results: []
  })

  useEffect(() => {
  }, [])

  return (
    <>
      <Header></Header>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path='/' component={TopStories}></Route>
        <Route path='/article/:id' component={Detail}></Route>
      </Suspense>
    </>
  )
}