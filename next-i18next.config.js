module.exports = {
  i18n: {
    defaultLocale: 'zhHant',
    locales: ['en', 'zhHant'],
    // Set LocalDetection to false so that you not get redirected to "zhHant" as default
    localeDetection: false,
    // Set localePath to fix serverSideTranslations crashes when called inside getServerSideProps on Vercel
    localePath: path.resolve('./public/locales')
  },
}
