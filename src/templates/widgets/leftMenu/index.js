import { useTranslation } from 'next-i18next';
import styles from './index.module.scss';

export default function LeftMenu() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('common');

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1>LeftMenu</h1>

          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
          <p>123456</p>
        </div>
      </div>
    </>
  );
}
