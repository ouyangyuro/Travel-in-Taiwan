import { useTranslation } from 'next-i18next';

import SpotSwiperCards from '@components/spotSwiperCards';
import SwiperCardsLoading from '@components/swiperCardsLoading';
import Head from 'src/features/detail/components/head';

import useGetNearybySpot from 'src/features/detail/hooks/useGetNearybySpot';

/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    queryType     query ('scenicSpot', 'restaurant', 'hotel', 'activity')
 * @param  {object}    position      所在地
 * @param  {string}    spotID        觀光資訊的 ID
 *
 * @return {html}
 */
function NearbySpot({ queryType, position, spotID }) {
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

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="w-full mt-6">
        <Head title={t('scenic_spot.more_spot')} />
        {status === 'success' && (
          <div className="mt-4">
            <SpotSwiperCards
              type={queryType}
              lists={data.filter((d) => d.ScenicSpotID !== spotID)}
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
