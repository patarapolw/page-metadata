import { getMetadata } from '../metadata'

const root = frameElement as HTMLIFrameElement
const elCard = document.getElementById('card') as HTMLDivElement
const elCardContent = document.getElementById('card-content') as HTMLDivElement
// const elCardContentInner = document.getElementById('card-content-inner') as HTMLDivElement
const elMetaTitle = document.getElementById('meta-title') as HTMLAnchorElement
const elMetaUrl = document.getElementById('meta-url') as HTMLAnchorElement
const elMetaDescription = document.getElementById('meta-description') as HTMLDivElement

const u = new URL(location.href)
const url = u.searchParams.get('url')
let opts = {} as any

setIframeSize()

if (root) {
  opts = root.getAttribute('data-option') || {}
}

if (url) {
  (async () => {
    const meta = await getMetadata(url)

    const imgEls: HTMLImageElement[] = []

    document.querySelectorAll('.card-image img').forEach((el) => {
      const img = el as HTMLImageElement

      if (meta.image) {
        img.alt = meta.title || meta.url
        img.onload = () => {
          imgEls.push(img)

          if (imgEls.length === 2) {
            const [im1, im2] = imgEls
            let imFront = im1
            let imBack = im2

            if (im1.clientHeight > im2.clientHeight) {
              imFront = im2
              imBack = im1
            } else {
              imFront = im1
              imBack = im2
            }

            if (opts.blur) {
              imBack.style.filter = 'blur(5px)'
              imFront.style.zIndex = '100'
            } else {
              imBack.style.zIndex = '100'
            }

            if (opts.top0) {
              imFront.style.top = '0'
            }
          }
        }
        img.src = meta.image || ''
      } else {
        img.parentElement!.style.display = 'none'
      }
    })

    if (meta.title) {
      elMetaTitle.innerText = meta.title
      elMetaTitle.href = meta.url
    } else {
      elMetaUrl.innerText = meta.url
      elMetaUrl.href = meta.url
    }

    elMetaDescription.innerText = (meta.description || '')
    // .substr(0, 140)
    elCardContent.style.minHeight = 'auto'
    // elCardContent.style.height = elCardContentInner.scrollHeight + 'px'

    setIframeSize()
  })()
}

function setIframeSize () {
  if (elCard.clientWidth > outerWidth - 50) {
    elCard.style.width = outerWidth - 50 + 'px'
  }

  if (root) {
    root.style.height = document.documentElement.scrollHeight + 10 + 'px'
    root.style.width = document.documentElement.scrollWidth + 10 + 'px'
  }
}
