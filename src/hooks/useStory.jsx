export function useStory({ data }) {
  const { by, kids, score, title, url } = data

  let domain = ''
  try {
    domain = new URL(url).hostname.replace('wwww.', '')
  } catch { }

  return {
    by,
    kids,
    score,
    title,
    url,
    domain
  }
}