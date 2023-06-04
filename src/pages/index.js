import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import SEO from '@utils/seo';
import DefaultLayout from '@layout/defaultLayout';
import TopBanner from '@components/topBanner';
import SpotSwiperCards from '@components/spotSwiperCards';
import SwiperCardsLoading from '@components/swiperCardsLoading';

import SearchBtn from 'src/features/home/components/searchBtn';
import useGetScenicSpot from 'src/features/home/hooks/useGetScenicSpot';

import styles from './index.module.scss';

export default function Home() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('home');
  const router = useRouter();

  /** ---------------------------------------------------------------------------------------------
   * Hook
   * 名稱: 取得所有觀光景點資料 API
   * @type {undefined|string}    status       API 狀態
   *                                            - undefined: 初始
   *                                            - "loading": 讀取
   *                                            - "success": 成功
   *                                            - "error"  : 失敗
   *                                            - "cancel" : 取消
   * @type {undefined|array}     data         觀光景點資料
   * @type {undefined|string}    error        error message
   */
  const {
    status: scenicSpotStatus,
    data: scenicSpotData,
    error: scenicSpotError,
  } = useGetScenicSpot();
  // console.log(scenicSpotStatus, scenicSpotData, scenicSpotError); //FIXME:

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <SEO title={t('title')} />
      <div className="w-full h-full">
        <div className={`${styles.box} w-full h-full px-4 pt-4 pb-8`}>
          <TopBanner title={t('banner.title')} subject={t('banner.subject')} />
          <SearchBtn />
          {scenicSpotStatus === 'success' && (
            <div className="mt-4 mb-10">
              <SpotSwiperCards type={'scenicSpot'} lists={scenicSpotData} />
            </div>
          )}
          {(scenicSpotStatus === undefined ||
            scenicSpotStatus === 'loading' ||
            scenicSpotStatus === 'cancel') && (
            <div className="mt-4 mb-10">
              <SwiperCardsLoading />
            </div>
          )}

          <p>
            123456 123456 123456 123456 123456 123456 123456 123456 123456
            123456 123456 123456 123456 123456 123456 123456 123456 123456
          </p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
        </div>
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
      ...(await serverSideTranslations(locale, [
        'api_mapping',
        'common',
        'home',
      ])),
      // Will be passed to the page component as props
    },
  };
}
