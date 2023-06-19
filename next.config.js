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
};

module.exports = nextConfig;
