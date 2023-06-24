import { Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider, } from 'react-query'
import './App.css'
import Header from './Header'
import { Route } from 'wouter'

const TopStories = lazy(() => import('./pages/TopStories'))
const Detail = lazy(() => import('./pages/Detail'))

const queryClient = new QueryClient()

export default function App() {

  return (
    <>
      <Header></Header>
      <Suspense fallback={<div>Loading...</div>}>
        <QueryClientProvider client={queryClient}>
          <Route path='/' component={TopStories}></Route>
          <Route path='/article/:id' component={Detail}></Route>
        </QueryClientProvider>
      </Suspense>
    </>
  )
}