import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import DefaultLayout from '@layout/defaultLayout';

import styles from './index.module.scss';

export default function Home() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('home');

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')} {t('title')} {t('title')} {t('title')} {t('title')}123456 {t('title')} {t('title')} {t('title')} {t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
        <p>{t('title')}</p>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}
