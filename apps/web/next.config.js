const { createContentlayerPlugin } = require('next-contentlayer2')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname, '../../'),
  },
}

const withContentlayer = createContentlayerPlugin({})

const withNextIntl = require('next-intl/plugin')('./src/i18n')

module.exports = withNextIntl(withContentlayer(nextConfig))
