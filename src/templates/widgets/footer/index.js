import { useTranslation } from 'next-i18next';

import styles from './index.module.scss';

export default function Footer() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('common');

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.container}>{t('footer.title')}</div>
    </>
  );
}
