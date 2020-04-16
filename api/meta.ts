import { NowRequest, NowResponse } from '@now/node'
import cheerio from 'cheerio'

import { get } from './cors'

export default async function (req: NowRequest, res: NowResponse) {
  const { url } = req.query
  if (!url || !url[0]) {
    throw new Error('No url is specified')
  }

  const $ = cheerio.load(await get(Array.isArray(url) ? url[0] : url))

  const title = $('meta[property=og:title]').text() || $('title').text()
  const description = $('meta[property=og:description]').text() || $('meta[name=description]').text()
  const image = $('meta[property=og:image]').text()

  res.send({
    title,
    description,
    image
  })
}
