/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // NEXT_DIST_DIR=.next-build dile test build dev server er .next cache e hat dey na
  distDir: process.env.NEXT_DIST_DIR || '.next',
};
export default nextConfig;
