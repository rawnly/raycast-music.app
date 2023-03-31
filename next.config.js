/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["files.raycast.com", "raycast.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
