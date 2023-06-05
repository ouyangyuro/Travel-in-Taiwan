import { useState, useEffect, useRef } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import DefaultLayout from '@layout/defaultLayout';

function Test() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation(['detail','test']);

  useEffect(() => {
    console.log('hi');

    return () => {
      console.clear();
    };
  }, []);

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div>{t('test:title')}{t('detail:scenic_spot.more_spot')}</div>
    </>
  );
}

Test.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common', 'test'])),
//       // Will be passed to the page component as props
//     },
//   };
// }

export async function getServerSideProps({ locale }) {
  const returnData = {
    props: {
      ...(await serverSideTranslations(locale, [
        'api_mapping',
        'common',
        'test',
        'detail',
      ])),
      // Will be passed to the page component as props
    },
  };

  return returnData;
}

export default Test;
