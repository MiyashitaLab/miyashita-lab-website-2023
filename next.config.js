const redirects = require('./redirects.json')

const encodeRedirectURL = (text) => {
  const regHttp = /^(https?)/
  if (regHttp.test(text)) {
    // 外部リンク
    const splitIndex = text.indexOf(':')+1
    const http = text.substring(0, splitIndex)
    const url = text.substring(splitIndex)
    return http + encodeRedirectURL(url)
  } else {
    const separators = /([/ /? = &])/g
    return text
      .split(separators)
      .map((e) => {
        if (separators.test(e)) return e
        else return encodeURIComponent(e)
      })
      .join('')
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'images.ctfassets.net',
        protocol: 'https',
        pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`,
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/researches/:slug/assets/:name',
        destination: '/api/asset-paper/:slug',
      },
    ]
  },
  redirects: async () => {
    return [...redirects].filter(e=>e.source==e.destination).map((item) => ({
      source: encodeRedirectURL(item.source),
      destination: encodeRedirectURL(item.destination),
      permanent: item.permanent,
    }))
  },
  experimental: {
    scrollRestoration: true,
    largePageDataBytes: 1024 * 1000, //1MB
  },
}

module.exports = nextConfig
