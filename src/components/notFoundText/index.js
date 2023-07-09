import { useTranslation } from 'next-i18next';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Not Found Text
 * @param  {string}    textColorName    字的顏色名
 *
 * @return {html}
 */
function NotFoundText({ textColorName = 'text-primary' }) {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('common');

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <p className={`text-2xl text-center ${textColorName}`}>{t('not_found_data')}</p>
    </>
  );
}

export default NotFoundText;
