import { NowRequest, NowResponse } from '@now/node'
import domino from 'domino'
// @ts-ignore
import { getMetadata } from 'page-metadata-parser'

import { get } from './cors'

export default async function (req: NowRequest, res: NowResponse) {
  const { url } = req.query
  if (!url || !url[0]) {
    throw new Error('No url is specified')
  }

  const u = Array.isArray(url) ? url[0] : url

  const html = await get(u)
  const doc = domino.createWindow(html).document
  const metadata = getMetadata(doc, u)

  res.send(metadata)
}
