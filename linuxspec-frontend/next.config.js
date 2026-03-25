/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid intermittent cache corruption on mounted filesystems.
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;
