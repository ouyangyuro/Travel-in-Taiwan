import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { setIsOpen, setIsTransform } from '@redux/hambuage';

import cx from '@utils/cx';

import styles from './index.module.scss';

/**
 * Hambuage 漢堡清單
 */
export default function Hambuage() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();

  /** ---------------------------------------------------------------------------------------------
   * State
   * @type {boolean}                isTransform     轉場效果開關
   */
  const { isTransform } = useSelector((state) => state.hambuage);

  /** ---------------------------------------------------------------------------------------------
   * onClick: Close 漢堡選單 + 轉場效果
   */
  const handleClose = () => {
    dispatch(setIsTransform(false));
    setTimeout(() => {
      dispatch(setIsOpen(false));
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
