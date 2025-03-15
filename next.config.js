/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // Or 'export' if you're using static export
  basePath: isProd ? '/covid-update-dashboard' : '', // Use basePath only in production
  assetPrefix: isProd ? '/covid-update-dashboard' : '', // Use assetPrefix only in production
};

module.exports = nextConfig;
