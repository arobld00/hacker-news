export default async function getItem({ id }) {
  const API = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  const response = await fetch(API)

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json()
}