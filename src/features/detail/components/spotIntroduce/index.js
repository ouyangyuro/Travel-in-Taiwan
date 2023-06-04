import { useTranslation } from 'next-i18next';

import Head from 'src/features/detail/components/head';

/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    descriptionDetail     詳細介紹
 *
 * @return {html}
 */
function SpotIntroduce({ descriptionDetail }) {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('detail');
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="w-full mt-6">
        <Head title={t('scenic_spot.introduce')} />
        <p className="mt-4 text-base text-text_primary">{descriptionDetail}</p>
      </div>
    </>
  );
}

export default SpotIntroduce;
