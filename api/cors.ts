import http from 'http'
import https from 'https'

import { NowRequest, NowResponse } from '@now/node'

// https://stackoverflow.com/questions/6287297/reading-content-from-url-with-node-js
export async function get (url: string) {
  return new Promise<string>((resolve, reject) => {
    const client = url.startsWith('https') ? https : http

    client.get(url, (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(data)
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

export default async function (req: NowRequest, res: NowResponse) {
  const { url } = req.query
  if (!url || !url[0]) {
    throw new Error('No url is specified')
  }

  res.send(await get(Array.isArray(url) ? url[0] : url))
}
