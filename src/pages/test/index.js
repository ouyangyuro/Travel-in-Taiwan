import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import DefaultLayout from 'src/layout/defaultLayout';

function Test() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('test');

  // ---------------------------------------------------------------------------------------------

  return <>{t('title')}</>;
}

Test.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'test'])),
      // Will be passed to the page component as props
    },
  };
}

export default Test;
