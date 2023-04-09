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
