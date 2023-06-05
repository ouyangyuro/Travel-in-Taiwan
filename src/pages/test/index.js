import { useState, useEffect, useRef } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import DefaultLayout from '@layout/defaultLayout';

function Test() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('test');

  useEffect(() => {
    console.log('hi');

    return () => {
      console.clear();
    };
  }, []);

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div>{t('title')}{t('scenic_spot.more_spot')}</div>
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
        'detail',
      ])),
      // Will be passed to the page component as props
    },
  };

  return returnData;
}

export default Test;
