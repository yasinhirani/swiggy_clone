/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media-assets.swiggy.com", "res.cloudinary.com"],
  },
  env: {
    MONGODB_CONNECT_URI: process.env.MONGODB_CONNECT_URI,
  },
};

module.exports = nextConfig;
