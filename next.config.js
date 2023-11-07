/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["media-assets.swiggy.com", "res.cloudinary.com"],
  },
  env: {
    MONGODB_CONNECT_URI: process.env.MONGODB_CONNECT_URI
  },
  eslint: {
    dirs: ["app", "components", "core", "shared"]
  }
};

module.exports = nextConfig;
