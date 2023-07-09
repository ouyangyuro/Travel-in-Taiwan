import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import moment from 'moment-timezone';

import SEO from '@utils/seo';
import DefaultLayout from '@layout/defaultLayout';
import TopBanner from '@components/topBanner';
import TypeTitle from '@components/typeTitle';
import ScenicSpotSwiperCards from '@components/scenicSpotSwiperCards';
import ActivitySwiperCards from '@components/activitySwiperCards';
import RestaurantSwiperCards from '@components/restaurantSwiperCards';
import HotelSwiperCards from '@components/hotelSwiperCards';
import NotFoundText from '@components/notFoundText';

import SearchBtn from 'src/features/home/components/searchBtn';

import getScenicSpotAPI from 'src/api/getScenicSpotAPI';
import getActivityAPI from 'src/api/getActivityAPI';
import getRestaurantAPI from 'src/api/getRestaurantAPI';
import getHotelAPI from 'src/api/getHotelAPI';

import styles from './index.module.scss';

export default function Home({
  scenicSpotData: returnScenicSpotData,
  activityData: returnActivityData,
  restaurantData: returnRestaurantData,
  hotelData: returnHotelData,
}) {
  /** ---------------------------------------------------------------------------------------------
   * SSG State
   *
   * @type {string}               status              API 狀態
   *                                                  - "success": 成功
   *                                                  - "error"  : 失敗
   * @type {undefined|array}      data                存 api 回傳的資料
   * @type {undefined|string}     error               error message
   */
  const {
    status: scenicSpotStatus,
    data: scenicSpotData,
    error: scenicSpotError,
  } = returnScenicSpotData;
  // console.log(scenicSpotStatus,scenicSpotData,scenicSpotError); //FIXME:
  const {
    status: activityStatus,
    data: activityData,
    error: activityError,
  } = returnActivityData;
  // console.log(activityStatus,activityData,activityError); //FIXME:
  const {
    status: restaurantStatus,
    data: restaurantData,
    error: restaurantError,
  } = returnRestaurantData;
  // console.log(restaurantStatus, restaurantData, restaurantError); //FIXME:
  const {
    status: hotelStatus,
    data: hotelData,
    error: hotelError,
  } = returnHotelData;
  // console.log(hotelStatus, hotelData, hotelError); //FIXME:

  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('home');

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
          {scenicSpotStatus === 'success' &&
            Array.isArray(scenicSpotData) &&
            scenicSpotData.length > 0 && (
              <div className="mt-4 mb-10">
                <ScenicSpotSwiperCards lists={scenicSpotData} />
              </div>
            )}
          {(scenicSpotStatus === 'error' ||
            (scenicSpotStatus === 'success' && scenicSpotData.length <= 0)) && (
            <div className="mt-4 mb-10">
              <NotFoundText />
            </div>
          )}

          <div className="mt-6">
            <TypeTitle
              title={t('type_title.activity')}
              iconColor="var(--secondary)"
            />
          </div>
          {activityStatus === 'success' &&
            Array.isArray(activityData) &&
            activityData.length > 0 && (
              <div className="mt-4 mb-10">
                <ActivitySwiperCards lists={activityData} />
              </div>
            )}
          {(activityStatus === 'error' ||
            (activityStatus === 'success' && activityData.length <= 0)) && (
            <div className="mt-4 mb-10">
              <NotFoundText textColorName="text-secondary" />
            </div>
          )}

          <div className="mt-6">
            <TypeTitle
              title={t('type_title.restaurant')}
              iconColor="var(--quaternary)"
            />
          </div>
          {restaurantStatus === 'success' &&
            Array.isArray(restaurantData) &&
            restaurantData.length > 0 && (
              <div className="mt-4 mb-10">
                <RestaurantSwiperCards lists={restaurantData} />
              </div>
            )}
          {(restaurantStatus === 'error' ||
            (restaurantStatus === 'success' && restaurantData.length <= 0)) && (
            <div className="mt-4 mb-10">
              <NotFoundText textColorName="text-quaternary" />
            </div>
          )}

          <div className="mt-6">
            <TypeTitle
              title={t('type_title.hotel')}
              iconColor="var(--tertiary)"
            />
          </div>
          {hotelStatus === 'success' &&
            Array.isArray(hotelData) &&
            hotelData.length > 0 && (
              <div className="mt-4 mb-10">
                <HotelSwiperCards lists={hotelData} />
              </div>
            )}
          {(hotelStatus === 'error' ||
            (hotelStatus === 'success' && hotelData.length <= 0)) && (
            <div className="mt-4 mb-10">
              <NotFoundText textColorName="text-tertiary" />
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
  // --------------------------------------------------------
  // scenicSpot: call API 取得所有觀光景點資料前10筆
  let scenicSpotData = {
    data: undefined,
    status: undefined,
    error: undefined,
  };
  const scenicSpotResponseData = await getScenicSpotAPI({
    top: 10,
    select: 'ScenicSpotID,ScenicSpotName,Picture,Address,City,OpenTime',
  });
  if (scenicSpotResponseData?.status === 'success') {
    // handle success (取得觀光景點資料)
    scenicSpotData = {
      status: scenicSpotResponseData?.status,
      data: scenicSpotResponseData?.data,
    };
  } else {
    // handle error (後端錯誤)
    scenicSpotData = {
      status: scenicSpotResponseData?.status,
      error: scenicSpotResponseData?.desc,
    };
  }

  // --------------------------------------------------------
  // activity: call API 取得所有觀光活動資料前10筆
  let activityData = {
    data: undefined,
    status: undefined,
    error: undefined,
  };
  // 宣告台北時區
  const time = moment(new Date(), 'Asia/Taipei').format('YYYY-MM-DD');
  const activityResponseData = await getActivityAPI({
    top: 10,
    select: 'ActivityID,ActivityName,Picture,Address,City,StartTime,EndTime',
    filter: `Picture/PictureUrl1 ne null and EndTime ge ${time}`,
  });
  if (activityResponseData?.status === 'success') {
    // handle success (取得觀光活動資料)
    activityData = {
      status: activityResponseData?.status,
      data: activityResponseData?.data,
    };
  } else {
    // handle error (後端錯誤)
    activityData = {
      status: activityResponseData?.status,
      error: activityResponseData?.desc,
    };
  }

  // --------------------------------------------------------
  // restaurant: call API 取得所有觀光餐飲資料前10筆
  let restaurantData = {
    data: undefined,
    status: undefined,
    error: undefined,
  };
  const restaurantResponseData = await getRestaurantAPI({
    top: 10,
    select: 'RestaurantID,RestaurantName,Picture,Address,OpenTime',
  });
  if (restaurantResponseData?.status === 'success') {
    // handle success (取得觀光餐飲資料)
    restaurantData = {
      status: restaurantResponseData?.status,
      data: restaurantResponseData?.data,
    };
  } else {
    // handle error (後端錯誤)
    restaurantData = {
      status: restaurantResponseData?.status,
      error: restaurantResponseData?.desc,
    };
  }

  // --------------------------------------------------------
  // hotel: call API 取得所有觀光旅宿資料前10筆
  let hotelData = {
    data: undefined,
    status: undefined,
    error: undefined,
  };
  const hotelResponseData = await getHotelAPI({
    top: 10,
    select: 'HotelID,HotelName,Picture,Address,Phone',
  });
  if (hotelResponseData?.status === 'success') {
    // handle success (取得觀光旅宿資料)
    hotelData = {
      status: hotelResponseData?.status,
      data: hotelResponseData?.data,
    };
  } else {
    // handle error (後端錯誤)
    hotelData = {
      status: hotelResponseData?.status,
      error: hotelResponseData?.desc,
    };
  }

  return {
    // Will be passed to the page component as props
    props: {
      ...(await serverSideTranslations(locale, [
        'api_mapping',
        'common',
        'home',
      ])),
      scenicSpotData: scenicSpotData,
      activityData: activityData,
      restaurantData: restaurantData,
      hotelData: hotelData,
    },
    // 24hr = 1440mins = 86400secs, regenerate(刷新) this page for a new incoming request
    revalidate: 86400,
  };
}
