/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 🚨 Don't fail build because of ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 🚨 Don't fail build because of TypeScript errors either
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
