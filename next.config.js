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
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
