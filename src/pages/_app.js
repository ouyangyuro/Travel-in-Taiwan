import { appWithTranslation } from 'next-i18next';

import 'src/styles/globals.scss';

function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />);
}

export default appWithTranslation(App);
