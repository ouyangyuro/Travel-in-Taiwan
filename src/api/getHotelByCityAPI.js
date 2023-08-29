import { i18n } from 'next-i18next';
import axios from 'axios';

import { API_HOSTNAME_URL } from 'src/config/config';
import { getAuthorizationHeader } from '@utils/getAuthorizationHeader';

/** ---------------------------------------------------------------------------------------------------------------------
 * 名稱: 取得'特定城市'觀光旅宿資料
 * 路由: /v2/Tourism/Hotel/{City}
 * 類型: Client to Server
 *
 * @param  {undefined|object}   [signal]        to control cancel requests
 * @param  {undefined|number}   top             回傳前幾筆
 * @param  {undefined|number}   skip            跳過前幾筆
 * @param  {string}             filter          過濾回傳的資料 (default: 不回傳沒照片的資料)
 * @param  {undefined|string}   spatialFilter   空間過濾(找特定經緯度附近), nearby(Lat,Lon,KM)
 * @param  {undefined|string}   select          只回傳資料的某些欄位
 * @param  {string}             city            要搜尋的城市
 *
 * @return {object}
 */
const getHotelByCityAPI = async ({
  signal = undefined,
  top = undefined,
  skip = undefined,
  filter = 'Picture/PictureUrl1 ne null',
  spatialFilter = undefined,
  select = undefined,
  city,
}) => {
  /** ---------------------------------------------------------------------------------------------------------------------
   * return 狀態
   * @type {undefined|string}   status (success, error, cancel)
   * @type {undefined|string}   desc (error message)
   * @type {undefined|array}    data
   * @type {undefined|object}   pagination
   */
  let returnData = {
    status: undefined,
    desc: undefined,
    data: undefined,
    pagination: undefined,
  };

  /** ---------------------------------------------------------------------------------------------
   * Query Parameter
   */
  let params = {
    $top: top,
    $skip: skip,
    $format: 'JSON',
    $filter: filter,
    $spatialFilter: spatialFilter,
    $select: select,
  };

  await axios
    .get(`https://${API_HOSTNAME_URL}/v2/Tourism/Hotel/${city}`, {
      signal: typeof signal === 'object' ? signal : undefined,
      params,
      headers: getAuthorizationHeader(),
      validateStatus: function (status) {
        return status < 600; // Resolve only if the status code is less than 500
      },
    })
    .then(function (response) {
      // console.log(`取得${city}觀光旅宿資料:`, response); //FIXME:
      if (response.status === 200) {
        // handle success
        returnData = {
          status: 'success',
          data: response.data,
          pagination: { top, skip },
        };
      } else {
        // handle error
        returnData = {
          status: 'error',
          desc: i18n.t(response.status, { ns: 'api_mapping' }),
        };
      }
    })
    .catch(function (error) {
      if (error.__CANCEL__) {
        // handle cancel
        returnData = {
          status: 'cancel',
          desc: i18n.t('cancel', { ns: 'api_mapping' }),
        };
      } else {
        // handle error
        returnData = {
          status: 'error',
          desc: i18n.t('error', { ns: 'api_mapping' }),
        };
      }
    });

  return returnData;
};

export default getHotelByCityAPI;
