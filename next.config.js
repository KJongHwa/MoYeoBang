// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'xdungeon.net',
      'i.postimg.cc',
      'www.xphobia.net',
      'secretgardenescape.com',
      'www.dumbndumber.kr',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
