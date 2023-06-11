import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import Head from 'src/features/detail/components/head';

const DynamicMap = dynamic(() => import('src/features/detail/components/map'), {
  ssr: false,
});
/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    travelInfo     旅行交通資訊
 * @param  {object}    position       經緯度
 *
 * @return {html}
 */
function TransportInfo({ travelInfo, position }) {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('detail');
  const location = [position.PositionLat, position.PositionLon];

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="w-full mt-6">
        <Head title={t('traffic')} />
        <DynamicMap position={location} />
        {travelInfo && (
          <p className="mt-4 text-base text-text_primary">{travelInfo}</p>
        )}
      </div>
    </>
  );
}

export default TransportInfo;
