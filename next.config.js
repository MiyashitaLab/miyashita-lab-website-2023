/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
        protocol: "https",
        pathname: "/srfcax7yjz0v/**", //TODO contentfulのスペースIDが変わったら変更する
      },
    ],
  },
};

module.exports = nextConfig;
