/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pg']
  },
  webpack: (config) => {
    config.externals.push('pg-native')
    return config
  }
}

module.exports = nextConfig