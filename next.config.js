/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/en',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['winflix.net', 'wp.winflix.net', 'wpen.winflix.net', 'wpit.winflix.net', 'wpde.winflix.net', 'secure.gravatar.com', 'api.coincap.io', 'image.assets.pressassociation.io', 'images.performgroup.com', 'uk1.sportal365images.com', 'media.api-sports.io'],
    path: `/en/_next/image`,
  }
}

module.exports = nextConfig
