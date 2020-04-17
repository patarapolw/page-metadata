// @ts-ignore
// import { getMetadata as metadataParser } from 'page-metadata-parser'
import qs from 'query-string'

// export async function getCors (url: string) {
//   return fetch(`https://cors-anywhere.herokuapp.com/${url}`).then(r => r.text())
//   return fetch(`/api/cors?${qs.stringify({ url })}`).then(r => r.text())
// }

export async function getMetadata (url: string) {
  // const root = document.createElement('html')
  // const html = await getCors(url)
  // root.innerHTML = html

  // return metadataParser(root, url)
  return fetch(`/api/metadata?${qs.stringify({ url })}`).then(r => r.json())
}
