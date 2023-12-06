/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Setting `resolve.alias` to `false` will tell webpack to ignore a module.
      // `msw/node` is a server-only module that exports methods not available in
      // the `browser`.
      config.resolve.alias = {
        ...config.resolve.alias,
        'msw/node': false
      }
    }
    return config
  }
}

module.exports = nextConfig
