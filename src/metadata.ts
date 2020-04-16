// @ts-ignore
import { getMetadata as metadataParser } from 'page-metadata-parser'
// import qs from 'query-string'

export async function getCors (url: string) {
  // return fetch(`/api/cors?${qs.stringify({ url })}`).then(r => r.text())
  return fetch(`https://cors-anywhere.herokuapp.com/${url}`).then(r => r.text())
}

export async function getMetadata (url: string) {
  const root = document.createElement('html')
  root.innerHTML = await getCors(url)

  return metadataParser(root, url)
}
