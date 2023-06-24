import { Link } from 'wouter'
import { useQuery } from 'react-query'
import getItem from '../services/getItem'
import { useStory } from "../hooks/useStory";

import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-size: 1.1em;
  padding: 0.25em 1em;
`

const Footer = styled.footer`
  padding: 0.25em 2.3em;
  display: flex;
  flex-direction: row;
  gap: 8px;
`

const StyledLink = styled(Link)`
  color: #BF4F74;
  gap: 8px;
`

export default function Story({ id, index }) {
  const { isLoading, isError, data, error } = useQuery(`/story/${id}`, () => getItem({ id }))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const { by, kids, score, title, url, domain } = useStory({ data })

  return (
    <article>
      <Header>
        <small>{index}. </small>
        <a href={url} target='_blank' rel='noopener noreferrer'>{title}</a>
        <a href={url} target='_blank' rel='noopener noreferrer'>({domain})</a>
      </Header>
      <Footer>
        <span>{score} points</span>
        <StyledLink href={`/article/${id}`}>
          by {by}
        </StyledLink>
        <StyledLink href={`/article/${id}`}>
          6 hours ago
        </StyledLink>
        <StyledLink href={`/article/${id}`}>
          {kids?.length ?? 0} comments
        </StyledLink>
      </Footer>
    </article>
  )
}