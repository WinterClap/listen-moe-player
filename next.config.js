/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.listen.moe"],
  },
  pageExtensions: ["page.tsx", "page.ts"],
};

module.exports = nextConfig;
