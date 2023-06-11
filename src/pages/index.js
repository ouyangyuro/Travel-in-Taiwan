import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import SEO from '@utils/seo';
import DefaultLayout from '@layout/defaultLayout';
import TopBanner from '@components/topBanner';
import TypeTitle from '@components/typeTitle';
import ScenicSpotSwiperCards from '@components/scenicSpotSwiperCards';
import ActivitySwiperCards from '@components/activitySwiperCards';
import SwiperCardsLoading from '@components/swiperCardsLoading';

import SearchBtn from 'src/features/home/components/searchBtn';
import useGetScenicSpot from 'src/features/home/hooks/useGetScenicSpot';
import useGetActivity from 'src/features/home/hooks/useGetActivity';

import styles from './index.module.scss';

export default function Home() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('home');

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

  /** ---------------------------------------------------------------------------------------------
   * Hook
   * 名稱: 取得所有觀光活動資料 API
   * @type {undefined|string}    status       API 狀態
   *                                            - undefined: 初始
   *                                            - "loading": 讀取
   *                                            - "success": 成功
   *                                            - "error"  : 失敗
   *                                            - "cancel" : 取消
   * @type {undefined|array}     data         觀光活動資料
   * @type {undefined|string}    error        error message
   */
  const {
    status: activityStatus,
    data: activityData,
    error: activityError,
  } = useGetActivity();
  // console.log(activityStatus, activityData, activityError); //FIXME:

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <SEO title={t('title')} />
      <div className="w-full h-full">
        <div className={`${styles.box} w-full h-full px-4 pt-4 pb-8`}>
          <TopBanner title={t('banner.title')} subject={t('banner.subject')} />
          <SearchBtn />

          <div className="mt-6">
            <TypeTitle title={t('type_title.scenicSpot')} />
          </div>
          {scenicSpotStatus === 'success' && (
            <div className="mt-4 mb-10">
              <ScenicSpotSwiperCards lists={scenicSpotData} />
            </div>
          )}
          {(scenicSpotStatus === undefined ||
            scenicSpotStatus === 'loading' ||
            scenicSpotStatus === 'cancel') && (
            <div className="mt-4 mb-10">
              <SwiperCardsLoading />
            </div>
          )}

          <div className="mt-6">
            <TypeTitle title={t('type_title.activity')} />
          </div>
          {activityStatus === 'success' && (
            <div className="mt-4 mb-10">
              <ActivitySwiperCards lists={activityData} />
            </div>
          )}
          {(activityStatus === undefined ||
            activityStatus === 'loading' ||
            activityStatus === 'cancel') && (
            <div className="mt-4 mb-10">
              <SwiperCardsLoading />
            </div>
          )}
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
