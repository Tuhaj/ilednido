const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/ilednido' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ilednido/' : '',
};

// Use ESM default export
export default nextConfig;

