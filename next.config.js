const redirects = require("./redirects.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
        protocol: "https",
        pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`,
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/researches/:slug/assets/:name",
        destination: "/api/asset-paper/:slug",
      },
    ];
  },
  redirects: async () => {
    return [...redirects].map((item) => ({
      source: item.source,
      destination: encodeURIComponent(item.destination),
      permanent: item.permanent,
    }));
  },
  experimental: {
    scrollRestoration: true,
    largePageDataBytes: 1024 * 1000, //1MB
  },
};

module.exports = nextConfig;
