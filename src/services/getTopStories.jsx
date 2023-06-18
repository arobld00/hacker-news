export default async function getTopStories({ page, limit }) {
  const API = `https://hacker-news.firebaseio.com/v0/topstories.json`
  const response = await fetch(API)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const topStories = await response.json()

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const ids = topStories.slice(startIndex, endIndex)

  if (Array.isArray(ids)) {
    return ids
  }
}