import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import cx from '@utils/cx';

import styles from './index.module.scss';

/**
 * Hambuage 漢堡清單
 */
export default function Hambuage({ setIsOpen, setIsTransform, isTransform }) {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('common');
  const router = useRouter();

    /** ---------------------------------------------------------------------------------------------
   * onClick: Close 漢堡選單 + 轉場效果
   */
  const handleClose = () => {
    setIsTransform(false)
    setTimeout(() => {
      setIsOpen(false);
      document.body.style = {};
    }, 400);
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.box} ${cx(isTransform && styles.drawer)}`}>
          <button onClick={handleClose}>X</button>
          <p>Hambuage</p>
        </div>
      </div>
    </>
  );
}
