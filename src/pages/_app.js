import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

import 'src/assets/styles/globals.scss';

function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
  );
}

export default appWithTranslation(App);
