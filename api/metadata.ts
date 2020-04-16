import { NowRequest, NowResponse } from '@now/node'
import domino from 'domino'
// @ts-ignore
import { getMetadata } from 'page-metadata-parser'
import axios from 'axios'

export default async function (req: NowRequest, res: NowResponse) {
  const { url } = req.query
  if (!url || !url[0]) {
    throw new Error('No url is specified')
  }

  const u = Array.isArray(url) ? url[0] : url

  const html = (await axios.get(u, {
    transformResponse: r => r
  })).data
  const doc = domino.createWindow(html).document
  const metadata = getMetadata(doc, u)

  res.send(metadata)
}
