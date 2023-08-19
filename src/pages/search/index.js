import { useState, useEffect, useRef } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import DefaultLayout from '@layout/defaultLayout';

function Search() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation(['detail', 'test']);

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div>Search</div>
    </>
  );
}

Search.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export async function getServerSideProps({ locale }) {
  return {
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
}

export default Search;
