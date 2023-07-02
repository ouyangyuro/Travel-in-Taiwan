import { useTranslation } from 'next-i18next';

import Head from 'src/features/detail/components/head';

/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    queryType     query ('scenicSpot', 'restaurant', 'hotel', 'activity')
 * @param  {string}    descriptionDetail     詳細介紹
 * @param  {string}    [titleColor]          title 顏色
 *
 * @return {html}
 */
function SpotIntroduce({ queryType, descriptionDetail, titleColor }) {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('detail');

  /** ---------------------------------------------------------------------------------------------
   * Head title type
   */
  const handleHeadType = () => {
    switch (queryType) {
      case 'scenicSpot':
        return t('scenic_spot.introduce');
      case 'restaurant':
        return t('restaurant.introduce');
      case 'hotel':
        return t('hotel.introduce');
      case 'activity':
        return t('activity.introduce');

      default:
        console.log('No match title'); //FIXME:
    }
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="w-full mt-6">
        <Head title={handleHeadType()} titleColor={titleColor} />
        <p className="mt-4 text-base text-text_primary">{descriptionDetail}</p>
      </div>
    </>
  );
}

export default SpotIntroduce;
