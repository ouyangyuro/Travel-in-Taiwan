import { i18n } from 'next-i18next';
import axios from 'axios';

import { API_HOSTNAME_URL } from 'src/config/env';
import { getAuthorizationHeader } from '@utils/getAuthorizationHeader';

/** ---------------------------------------------------------------------------------------------------------------------
 * 名稱: 取得所有觀光景點資料
 * 路由: /v2/Tourism/ScenicSpot
 * 類型: Client to Server
 *
 * @param  {undefined|object}   [signal]      to control cancel requests
 * @param  {number}             top           回傳前幾筆
 * @param  {undefined|number}   skip          跳過前幾筆
 * @param  {string}             filter        過濾回傳的資料 (default: 不回傳沒照片的資料)
 *
 * @return {object}
 */
const getScenicSpotAPI = async ({
  signal = undefined,
  top = 10,
  skip = undefined,
  filter = 'Picture/PictureUrl1 ne null',
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
  };

  await axios
    .get(`https://${API_HOSTNAME_URL}/v2/Tourism/ScenicSpot`, {
      signal: typeof signal === 'object' ? signal : undefined,
      params,
      headers: getAuthorizationHeader(),
      validateStatus: function (status) {
        return status < 600; // Resolve only if the status code is less than 500
      },
    })
    .then(function (response) {
      // console.log('取得所有觀光景點資料:', response); //FIXME:
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

export default getScenicSpotAPI;
