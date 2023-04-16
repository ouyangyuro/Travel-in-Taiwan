import { useTranslation } from 'next-i18next';
import styles from './index.module.scss';

function LeftMenu() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('common');

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className="w-full h-full">
        <div className={styles.box}>LeftMenu</div>
      </div>
    </>
  );
}

export default LeftMenu;
