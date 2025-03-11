/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/ilednido',
    assetPrefix: '/ilednido/',
  }
  
  module.exports = nextConfig
  