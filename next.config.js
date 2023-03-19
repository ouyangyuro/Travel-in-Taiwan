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
   * SASS & SCSS
   */
  sassOptions: {
    includePaths: ['./src'],
  },

  /* ---------------------------------------------------------------------------------------------
   * next-i18next
   */
  i18n,
};

module.exports = nextConfig;
