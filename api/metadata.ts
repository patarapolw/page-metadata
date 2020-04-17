import { getMetadata } from 'page-metadata-parser'
import axios from 'axios'
import domino from 'domino'
import { NowRequest, NowResponse } from '@now/node'

export default async (req: NowRequest, res: NowResponse) => {
  const { url } = req.query
  const u = Array.isArray(url) ? url[0] : url

  if (u) {
    const html = (await axios.get(u)).data
    const doc = domino.createWindow(html).document
    return res.json(getMetadata(doc, u))
  } else {
    throw new Error('URL might be provided')
  }
}
