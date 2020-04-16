import { NowRequest, NowResponse } from '@now/node'
import axios from 'axios'

export default async function (req: NowRequest, res: NowResponse) {
  const { url } = req.query
  if (!url || !url[0]) {
    throw new Error('No url is specified')
  }

  res.send((await axios.get(Array.isArray(url) ? url[0] : url, {
    transformResponse: r => r
  })).data)
}
