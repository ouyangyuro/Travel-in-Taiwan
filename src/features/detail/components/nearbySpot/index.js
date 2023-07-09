import { useTranslation } from 'next-i18next';

import SwiperCardsLoading from '@components/swiperCardsLoading';
import ScenicSpotSwiperCards from '@components/scenicSpotSwiperCards';
import ActivitySwiperCards from '@components/activitySwiperCards';
import RestaurantSwiperCards from '@components/restaurantSwiperCards';
import HotelSwiperCards from '@components/hotelSwiperCards';
import Head from 'src/features/detail/components/head';

import useGetNearybySpot from 'src/features/detail/hooks/useGetNearybySpot';

/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    queryType      query ('scenicSpot', 'restaurant', 'hotel', 'activity')
 * @param  {object}    position       所在地
 * @param  {string}    spotID         觀光資訊的 ID
 * @param  {string}    [titleColor]   title 顏色
 *
 * @return {html}
 */
function NearbySpot({ queryType, position, spotID, titleColor }) {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('detail');

  /** ---------------------------------------------------------------------------------------------
   * Hook
   * 名稱: 取得附近景點資料 API
   * @type {undefined|string}    status       API 狀態
   *                                            - undefined: 初始
   *                                            - "loading": 讀取
   *                                            - "success": 成功
   *                                            - "error"  : 失敗
   *                                            - "cancel" : 取消
   * @type {undefined|array}     data         附近景點資料
   * @type {undefined|string}    error        error message
   */
  const { status, data, error } = useGetNearybySpot({
    queryType: queryType,
    position: position,
  });
  // console.log('取得附近景點資料:', status, data, error); //FIXME:

  /** ---------------------------------------------------------------------------------------------
   * Head title type
   */
  const handleHeadType = () => {
    switch (queryType) {
      case 'scenicSpot':
        return t('scenic_spot.more_spot');
      case 'restaurant':
        return t('restaurant.more_spot');
      case 'hotel':
        return t('hotel.more_spot');
      case 'activity':
        return t('activity.more_spot');

      default:
        console.log('No match title'); //FIXME:
    }
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="w-full mt-6">
        <Head title={handleHeadType()} titleColor={titleColor} />
        {queryType === 'scenicSpot' && status === 'success' && (
          <div className="mt-4">
            <ScenicSpotSwiperCards
              lists={data.filter((d) => d.ScenicSpotID !== spotID)}
            />
          </div>
        )}

        {queryType === 'activity' && status === 'success' && (
          <div className="mt-4">
            <ActivitySwiperCards
              lists={data.filter((d) => d.ActivityID !== spotID)}
            />
          </div>
        )}

        {queryType === 'restaurant' && status === 'success' && (
          <div className="mt-4">
            <RestaurantSwiperCards
              lists={data.filter((d) => d.RestaurantID !== spotID)}
            />
          </div>
        )}

        {queryType === 'hotel' && status === 'success' && (
          <div className="mt-4">
            <HotelSwiperCards
              lists={data.filter((d) => d.HotelID !== spotID)}
            />
          </div>
        )}

        {(status === undefined ||
          status === 'loading' ||
          status === 'cancel') && (
          <div className="mt-4">
            <SwiperCardsLoading />
          </div>
        )}
      </div>
    </>
  );
}

export default NearbySpot;
