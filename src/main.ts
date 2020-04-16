import qs from 'query-string'
import hljs from 'highlight.js'

import { getMetadata } from './metadata'

import 'highlight.js/styles/default.css'

const elInput = document.querySelector('input[name=url]') as HTMLInputElement
const elOutput = document.getElementById('output') as HTMLDivElement
const elSocialLink = document.getElementById('social-link') as HTMLIFrameElement
const elMetadata = document.getElementById('metadata') as HTMLPreElement
const elCodeIframe = document.getElementById('code-iframe') as HTMLElement
// const elCodeApi = document.getElementById('code-api') as HTMLElement

const u = new URL(location.href)
const url = u.searchParams.get('url')

if (url) {
  (async () => {
    elInput.value = url
    elOutput.style.display = 'block'

    elSocialLink.src = `/share?${qs.stringify({ url })}`
    elCodeIframe.innerHTML = `&lt;iframe src="https://page-metadata.netlify.app/share?${qs.stringify({ url })}" allowtransparency="true">&lt;/iframe>`
    hljs.highlightBlock(elCodeIframe)

    // elCodeApi.innerText = `https://page-metadata.now.sh/api/metadata?${qs.stringify({ url })}`
    elMetadata.innerText = JSON.stringify(
      await getMetadata(url),
      null, 2
    )

    hljs.highlightBlock(elMetadata)
  })()
}
