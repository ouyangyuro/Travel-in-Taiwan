import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';

import SEO from '@utils/seo';
import EmptyLayout from '@layout/emptyLayout';

import BackBtnWithTitleAndCopy from 'src/features/detail/components/backBtnWithTitleAndCopy';
import BasicInfo from 'src/features/detail/components/basicInfo';
import SpotIntroduce from 'src/features/detail/components/spotIntroduce';
import TransportInfo from 'src/features/detail/components/transportInfo';
import NearbySpot from 'src/features/detail/components/nearbySpot';

import getScenicSpotAPI from 'src/api/getScenicSpotAPI';

import styles from './index.module.scss';

export default function Detail({ data }) {
  /** ---------------------------------------------------------------------------------------------
   * SSR State
   * @type {string}     QueryType             query ('scenicSpot', 'restaurant', 'hotel', 'activity')
   * @type {string}     Address               地址
   * @type {string}     Description           簡介
   * @type {string}     DescriptionDetail     詳細介紹
   * @type {string}     OpenTime              開放時間
   * @type {object}     ParkingPosition       停車地點
   * @type {string}     Phone                 聯絡電話
   * @type {object}     Picture               照片
   * @type {object}     Position              所在地
   * @type {string}     Remarks               注意事項
   * @type {string}     SpotID                觀光資訊的 ID
   * @type {string}     SpotName              觀光資訊的標題
   * @type {string}     SrcUpdateTime         資料來源更新時間
   * @type {string}     TicketInfo            收費資訊
   * @type {string}     TravelInfo            旅行交通資訊
   * @type {string}     UpdateTime            更新時間
   * @type {string}     ZipCode               郵遞區號
   */
  const {
    QueryType,
    Address,
    Description,
    DescriptionDetail,
    OpenTime,
    ParkingPosition,
    Phone,
    Picture,
    Position,
    Remarks,
    SpotID,
    SpotName,
    SrcUpdateTime,
    TicketInfo,
    TravelInfo,
    UpdateTime,
    ZipCode,
  } = data.detailData;
  //   console.log(data.detailData); //FIXME:

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <SEO title={SpotName} />

      <div className="w-full h-full">
        <div className={`${styles.box} w-full h-full px-4 pt-4 pb-8`}>
          <BackBtnWithTitleAndCopy spotName={SpotName} />
          <Image
            src={Picture.PictureUrl1}
            alt={Picture.PictureDescription1}
            width="0"
            height="0"
            sizes="100vw"
            className={`w-full h-40 ipad:h-80 desktop:h-96 mt-5 rounded`}
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={'/images/logo-loading.png'}
          />
          <BasicInfo address={Address} openTime={OpenTime} phone={Phone} />
          <SpotIntroduce descriptionDetail={DescriptionDetail} />
          <TransportInfo travelInfo={TravelInfo} position={Position} />
          <NearbySpot
            queryType={QueryType}
            position={Position}
            spotID={SpotID}
          />
        </div>
      </div>
    </>
  );
}

Detail.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export async function getServerSideProps({ params, query, locale }) {
  const { type } = params;
  const { did } = query;

  let detailData = {
    Address: undefined,
    Description: undefined,
    DescriptionDetail: undefined,
    OpenTime: undefined,
    ParkingPosition: undefined,
    Phone: undefined,
    Picture: undefined,
    Position: undefined,
    Remarks: undefined,
    SpotID: undefined,
    SpotName: undefined,
    SrcUpdateTime: undefined,
    TicketInfo: undefined,
    TravelInfo: undefined,
    UpdateTime: undefined,
    ZipCode: undefined,
  };

  switch (type) {
    // --------------------------------------------------------
    // scenicSpot: call API 取得特定觀光景點資料
    case 'scenicSpot':
      const responseData = await getScenicSpotAPI({
        filter: `ScenicSpotID eq '${did}'`,
      });

      if (responseData?.status === 'success') {
        // handle success (取得觀光景點資料)
        detailData = {
          QueryType: type,
          Address: responseData?.data[0]?.Address,
          Description: responseData?.data[0]?.Description,
          DescriptionDetail: responseData?.data[0]?.DescriptionDetail,
          OpenTime: responseData?.data[0]?.OpenTime,
          ParkingPosition: responseData?.data[0]?.ParkingPosition,
          Phone: responseData?.data[0]?.Phone,
          Picture: responseData?.data[0]?.Picture,
          Position: responseData?.data[0]?.Position,
          Remarks: responseData?.data[0]?.Remarks ?? null,
          SpotID: responseData?.data[0]?.ScenicSpotID,
          SpotName: responseData?.data[0]?.ScenicSpotName,
          SrcUpdateTime: responseData?.data[0]?.SrcUpdateTime,
          TicketInfo: responseData?.data[0]?.TicketInfo ?? null,
          TravelInfo: responseData?.data[0]?.TravelInfo ?? null,
          UpdateTime: responseData?.data[0]?.UpdateTime,
          ZipCode: responseData?.data[0]?.ZipCode,
        };
      } else {
        // handle error (後端錯誤) -> not found page(404 page)
        return {
          notFound: true,
        };
      }
      break;

    // --------------------------------------------------------
    // restaurant: call API 取得特定觀光餐飲資料
    case 'restaurant':
      break;

    // --------------------------------------------------------
    // hotel: call API 取得特定觀光旅宿資料
    case 'hotel':
      break;

    // --------------------------------------------------------
    // activity: call API 取得特定觀光活動資料
    case 'activity':
      break;

    // --------------------------------------------------------
    // error -> not found page(404 page)
    default:
      return {
        notFound: true,
      };
  }

  const returnData = {
    props: {
      ...(await serverSideTranslations(locale, [
        'api_mapping',
        'common',
        'detail',
      ])),
      // Will be passed to the page component as props

      data: {
        detailData,
      },
    },
  };

  return returnData;
}
