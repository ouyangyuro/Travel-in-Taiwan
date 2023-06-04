import { useState, useEffect, useRef } from 'react';

import getScenicSpotAPI from 'src/api/getScenicSpotAPI';

/** -------------------------------------------------------------------------------------------------------------------
 * 取得附近資料 API
 * @param  {string}    queryType     query ('scenicSpot', 'restaurant', 'hotel', 'activity')
 * @param  {object}    position      所在地
 *
 * @return {undefined|string}    status       API 狀態
 *                                            - undefined: 初始
 *                                            - "loading": 讀取
 *                                            - "success": 成功
 *                                            - "error"  : 失敗
 *                                            - "cancel" : 取消
 * @return {undefined|array}     data         存 api 回傳的資料
 * @return {undefined|object}    pagination   存 api 回傳的分頁資料
 * @return {undefined|string}    error        error message
 */
const useGetNearybySpot = ({ queryType, position }) => {
  /** ---------------------------------------------------------------------------------------------
   * State
   *
   * @type {undefined|string}     status              API 狀態
   *                                                  - undefined: 初始
   *                                                  - "loading": 讀取
   *                                                  - "success": 成功
   *                                                  - "error"  : 失敗
   *                                                  - "cancel" : 取消
   * @type {undefined|array}      data                存 api 回傳的資料
   * @type {undefined|object}     pagination          存 api 回傳的分頁資料
   * @type {undefined|string}     error               error message
   *
   * @type {undefined|boolean}    isMountedRef        確認是否還在該頁面 (該頁是否存在)
   * @type {undefined|object}     apiControllerRef    api 控制器
   */

  const [status, setStatus] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [pagination, setPagination] = useState(undefined);
  const [error, setError] = useState(undefined);

  const isMountedRef = useRef(true);
  const apiControllerRef = useRef();

  /** ---------------------------------------------------------------------------------------------
   * Hook
   * 名稱: 離開, 清空
   */
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      apiControllerRef.current?.abort();
      console.clear(); //FIXME:
    };
  }, []);

  /** ---------------------------------------------------------------------------------------------
   * Hook
   * 名稱: 取得附近資料
   */
  useEffect(() => {
    const handleSpot = async () => {
      console.log(`~~~~取得附近觀光${queryType}資料~~~~`); //FIXME:

      // loading
      setStatus('loading');

      // 取消上次API請求
      apiControllerRef.current?.abort();

      // 創建API請求
      apiControllerRef.current = new AbortController();

      let responseData;

      switch (queryType) {
        // --------------------------------------------------------
        // call API 取得附近觀光景點資料
        case 'scenicSpot':
          responseData = await getScenicSpotAPI({
            signal: apiControllerRef.current.signal,
            top: 10,
            spatialFilter: `nearby(${position.PositionLat},${position.PositionLon},50000)`,
            select: 'ScenicSpotID,ScenicSpotName,Picture,Address,City,OpenTime',
          });
          break;

        // --------------------------------------------------------
        // call API 取得附近觀光餐飲資料
        case 'restaurant':
          break;

        // --------------------------------------------------------
        // call API 取得附近觀光旅宿資料
        case 'hotel':
          break;

        // --------------------------------------------------------
        // call API 取得附近觀光活動資料
        case 'activity':
          break;

        default:
          break;
      }

      // 確保在此頁執行
      if (isMountedRef.current) {
        if (responseData?.status === 'success') {
          // handle success (取得附近資料)
          setData(responseData?.data);
          setPagination(responseData?.pagination);
          setStatus('success');
        } else if (responseData?.status === 'error') {
          // handle error (後端錯誤)
          setStatus('error');
          setError(responseData.desc);
        } else {
          // handle cancel (取消 call api)
          setStatus('cancel');
        }
      }
    };

    handleSpot();
  }, [queryType, position]);

  // ---------------------------------------------------------------------------------------------

  return {
    status: status,
    data: data,
    pagination: pagination,
    error: error,
  };
};

export default useGetNearybySpot;
