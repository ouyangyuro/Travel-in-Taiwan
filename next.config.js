/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  /* ---------------------------------------------------------------------------------------------
   * 嚴格模式
   */
  reactStrictMode: true,

  /* ---------------------------------------------------------------------------------------------
   * @svgr/webpack
   */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  /* ---------------------------------------------------------------------------------------------
   * 允許使用picsum網站的假圖 & 交通部的圖片
   */
  images: {
    domains: [
      'picsum.photos',
      'www.eastcoast-nsa.gov.tw',
      'www.penghu-nsa.gov.tw',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'penghutravel.com',
      },
    ],
  },

  /* ---------------------------------------------------------------------------------------------
   * SASS & SCSS
   */
  sassOptions: {
    includePaths: ['./src'],
    prependData: `
    @import '/src/assets/styles/theme.scss';
    @import '/src/assets/styles/breakpoint.scss';
  `,
  },

  /* ---------------------------------------------------------------------------------------------
   * next-i18next
   */
  i18n,
};

module.exports = nextConfig;
