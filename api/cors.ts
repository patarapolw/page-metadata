import { NowRequest, NowResponse } from '@now/node'
import axios from 'axios'

// https://stackoverflow.com/questions/6287297/reading-content-from-url-with-node-js
export async function get (url: string) {
  return (await axios.get(url, {
    transformResponse: r => r
  })).data
}

export default async function (req: NowRequest, res: NowResponse) {
  const { url } = req.query
  if (!url || !url[0]) {
    throw new Error('No url is specified')
  }

  res.send(await get(Array.isArray(url) ? url[0] : url))
}
