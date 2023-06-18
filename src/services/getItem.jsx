export default async function getItem({ id }) {
  const API = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  const response = await fetch(API)
  return await response.json()
}