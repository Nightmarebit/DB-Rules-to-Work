const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
// PWA: custom SW in public/sw.js, registered via RegisterSW. For full Workbox: npm i @ducanh2912/next-pwa and wrap withPWA(nextConfig).
const basePath = process.env.BASE_PATH || '';
const nextConfig = {
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : '',
  // Static export only for production build; dev server runs without it to avoid 500 on _ssgManifest
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
};

module.exports = withNextIntl(nextConfig);
