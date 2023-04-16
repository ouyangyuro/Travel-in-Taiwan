import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

import siteMetaData from 'src/config/siteMetaData';

import 'src/assets/styles/globals.scss';

function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            {/* TODO: Google */}
            {/* <meta
              name="google-site-verification"
              content={siteMetaData.google_site_verification}
            /> */}

            {/* TODO: FB */}
            {/* <meta property="fb:app_id" content={siteMetaData.fb_app_id} />
            <meta property="og:site_name" content={siteMetaData.title} /> */}
          </Head>
          <Component {...pageProps} />
        </>
      )}
    </Provider>
  );
}

export default appWithTranslation(App);
