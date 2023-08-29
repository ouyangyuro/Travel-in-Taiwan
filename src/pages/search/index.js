import { useState, useEffect, useRef } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import SEO from '@utils/seo';
import DefaultLayout from '@layout/defaultLayout';

import cityList from '@utils/cityList';
import themeList from '@utils/themeList';

import useGetSearchResault from 'src/features/search/hooks/useGetSearchResault';

import styles from './index.module.scss';

export default function Search({ data }) {
  /** ---------------------------------------------------------------------------------------------
   *  Basic
   */
  const { t } = useTranslation(['search']);

  /** ---------------------------------------------------------------------------------------------
   *  SSR State
   *  @type {string}    ssr_city       搜尋的城市
   *  @type {string}    ssr_type       搜尋的主題分類
   *  @type {string}    ssr_keyword    搜尋的關鍵字
   */
  const { city: ssr_city, type: ssr_type, keyword: ssr_keyword } = data.query;
  // console.log(ssr_city, ssr_type, ssr_keyword); //FIXME:
  const queryStringCity = ssr_city
    ? `${cityList().find((item) => item.value === ssr_city)?.name}`
    : t('default_city');
  const queryStringType = ssr_type
    ? `/ ${themeList().find((item) => item.value === ssr_type)?.name}`
    : `/ ${t('default_type')}`;
  const queryStringKeyword = ssr_keyword ? `/ ${ssr_keyword}` : '';
  const seoTitle = `${t(
    'title'
  )} - ${queryStringCity} ${queryStringType} ${queryStringKeyword}`;

  /** ---------------------------------------------------------------------------------------------
   * State
   * @type {object}              error        後端錯誤畫面
   */
  const [error, setError] = useState({ error: false, errorMsg: '' });

  /** ---------------------------------------------------------------------------------------------
   * Hook
   * 名稱: 取得指定'type'搜尋結果的資料 API
   * @type {undefined|string}    status       API 狀態
   *                                            - undefined: 初始
   *                                            - "loading": 讀取
   *                                            - "success": 成功
   *                                            - "error"  : 失敗
   *                                            - "cancel" : 取消
   * @type {undefined|array}     data         搜尋結果的資料
   * @type {undefined|object}    pagination   搜尋結果的分頁資料
   * @type {undefined|string}    error        error message
   */
  const {
    status: searchStatus,
    data: searchData,
    pagination: searchPagination,
    error: searchError,
  } = useGetSearchResault({
    city: ssr_city,
    type: ssr_type,
    keyword: ssr_keyword,
  });
  // console.log(searchStatus, searchData, searchPagination, searchError); //FIXME:

  /** ---------------------------------------------------------------------------------------------
   * Hook
   * 名稱: 後端錯誤訊息處理
   */
  useEffect(() => {
    if (searchStatus === 'error' && searchError !== undefined) {
      setError({ error: true, errorMsg: searchError });
    } else {
      setError({ error: false, errorMsg: '' });
    }
  }, [searchStatus, searchError]);

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <SEO title={seoTitle} />

      <div className="w-full h-full">
        <div className={`${styles.box} w-full h-full px-4 pt-4 pb-8`}>
          {!error.error && <p>search</p>}

          {error.error && <>{error.errorMsg}</>}
        </div>
      </div>
    </>
  );
}

Search.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export async function getServerSideProps({ query, locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'api_mapping',
        'common',
        'search',
      ])),
      // Will be passed to the page component as props

      data: {
        query: query,
      },
    },
  };
}
