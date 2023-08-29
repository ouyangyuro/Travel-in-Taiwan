import { useState, useEffect, useRef } from 'react';

import getScenicSpotByCityAPI from 'src/api/getScenicSpotByCityAPI';
import getRestaurantByCityAPI from 'src/api/getRestaurantByCityAPI';
import getActivityByCityAPI from 'src/api/getActivityByCityAPI';
import getHotelByCityAPI from 'src/api/getHotelByCityAPI';

/** -------------------------------------------------------------------------------------------------------------------
 * 取得指定'type'搜尋結果的資料 API
 *
 * @param {string}    city       搜尋的城市
 * @param {string}    type       搜尋的主題分類
 * @param {string}    keyword    搜尋的關鍵字
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
const useGetSearchResault = ({ city, type, keyword }) => {
  // console.log(city, type, keyword); // FIXME:
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
  // const [loadmoreStatus, setLoadmoreStatus] = useState(undefined) //FIXME:
  const [data, setData] = useState(undefined);
  const [pagination, setPagination] = useState(undefined);
  const [error, setError] = useState(undefined);
  // const [isFirstCallAPI, setIsFirstCallAPI] = useState(false)  //FIXME:
  // const [isCanCallMoreAPI, setIsCanCallMoreAPI] = useState(false)  //FIXME:

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
   * 名稱: 取得搜尋結果的資料
   */
  useEffect(() => {
    const handleScenicSpot = async () => {
      console.log(`~~~~取得${city}觀光景點搜尋結果的資料~~~~`); //FIXME:

      // loading
      setStatus('loading');

      // 取消上次API請求
      apiControllerRef.current?.abort();

      // 創建API請求
      apiControllerRef.current = new AbortController();

      // call API 取得搜尋結果的資料
      const responseData = await getScenicSpotByCityAPI({
        signal: apiControllerRef.current.signal,
        top: 10,
        filter: keyword
          ? `Picture/PictureUrl1 ne null and (contains(ScenicSpotName,'${keyword}') or contains(Description,'${keyword}'))`
          : 'Picture/PictureUrl1 ne null',
        city: city,
      });

      // 確保在此頁執行
      if (isMountedRef.current) {
        if (responseData?.status === 'success') {
          // handle success (取得觀光景點資料)
          setData(responseData?.data);
          setPagination({
            ...responseData?.pagination,
            isMore: responseData?.data.length === 10 ? true : false,
          });
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

    const handleRestaurant = async () => {
      console.log(`~~~~取得${city}觀光餐飲搜尋結果的資料~~~~`); //FIXME:

      // loading
      setStatus('loading');

      // 取消上次API請求
      apiControllerRef.current?.abort();

      // 創建API請求
      apiControllerRef.current = new AbortController();

      // call API 取得搜尋結果的資料
      const responseData = await getRestaurantByCityAPI({
        signal: apiControllerRef.current.signal,
        top: 10,
        filter: keyword
          ? `Picture/PictureUrl1 ne null and (contains(RestaurantName,'${keyword}') or contains(Description,'${keyword}'))`
          : 'Picture/PictureUrl1 ne null',
        city: city,
      });

      // 確保在此頁執行
      if (isMountedRef.current) {
        if (responseData?.status === 'success') {
          // handle success (取得觀光餐飲資料)
          setData(responseData?.data);
          setPagination({
            ...responseData?.pagination,
            isMore: responseData?.data.length === 10 ? true : false,
          });
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

    const handleActivity = async () => {
      console.log(`~~~~取得${city}觀光活動搜尋結果的資料~~~~`); //FIXME:

      // loading
      setStatus('loading');

      // 取消上次API請求
      apiControllerRef.current?.abort();

      // 創建API請求
      apiControllerRef.current = new AbortController();

      // call API 取得搜尋結果的資料
      const responseData = await getActivityByCityAPI({
        signal: apiControllerRef.current.signal,
        top: 10,
        filter: keyword
          ? `Picture/PictureUrl1 ne null and (contains(ActivityName,'${keyword}') or contains(Description,'${keyword}'))`
          : 'Picture/PictureUrl1 ne null',
        city: city,
      });

      // 確保在此頁執行
      if (isMountedRef.current) {
        if (responseData?.status === 'success') {
          // handle success (取得觀光活動資料)
          setData(responseData?.data);
          setPagination({
            ...responseData?.pagination,
            isMore: responseData?.data.length === 10 ? true : false,
          });
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

    const handleHotel = async () => {
      console.log(`~~~~取得${city}觀光旅宿搜尋結果的資料~~~~`); //FIXME:

      // loading
      setStatus('loading');

      // 取消上次API請求
      apiControllerRef.current?.abort();

      // 創建API請求
      apiControllerRef.current = new AbortController();

      // call API 取得搜尋結果的資料
      const responseData = await getHotelByCityAPI({
        signal: apiControllerRef.current.signal,
        top: 10,
        filter: keyword
          ? `Picture/PictureUrl1 ne null and (contains(HotelName,'${keyword}') or contains(Description,'${keyword}'))`
          : 'Picture/PictureUrl1 ne null',
        city: city,
      });

      // 確保在此頁執行
      if (isMountedRef.current) {
        if (responseData?.status === 'success') {
          // handle success (取得觀光旅宿資料)
          setData(responseData?.data);
          setPagination({
            ...responseData?.pagination,
            isMore: responseData?.data.length === 10 ? true : false,
          });
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

    if (type === 'ScenicSpot') {
      handleScenicSpot();
    }
    if (type === 'Restaurant') {
      handleRestaurant();
    }
    if (type === 'Activity') {
      handleActivity();
    }
    if (type === 'Hotel') {
      handleHotel ();
    }
  }, [city, type, keyword]);

  // ---------------------------------------------------------------------------------------------

  return {
    status: status,
    data: data,
    pagination: pagination,
    error: error,
  };
};

export default useGetSearchResault;
