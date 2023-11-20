/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["media-assets.swiggy.com", "res.cloudinary.com"]
  },
  env: {
    MONGODB_CONNECT_URI: process.env.MONGODB_CONNECT_URI,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_SIGNATURE_SECRET: process.env.STRIPE_SIGNATURE_SECRET
  },
  eslint: {
    dirs: ["app", "components", "core", "shared"]
  }
};

module.exports = nextConfig;
