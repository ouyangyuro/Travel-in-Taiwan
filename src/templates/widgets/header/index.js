import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { setIsOpen, setIsTransform, setIsMobile } from '@redux/hambuage';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

import cx from '@utils/cx';
import Logo from '@image/logo';
import Hambuage from './feature/hambuage';

import styles from './index.module.scss';

export default function Header() {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname, query } = router;
  const nextLocale = router.locale === 'en' ? 'zhHant' : 'en';

  /** ---------------------------------------------------------------------------------------------
   * State
   * @type {boolean}                isOpen          是否打開漢堡選單
   * @type {boolean}                isTransform     轉場效果開關
   * @type {undefined|boolean}      isMobile        是不是手機設備
   */
  const { isOpen, isTransform, isMobile } = useSelector(
    (state) => state.hambuage
  );

  /** ---------------------------------------------------------------------------------------------
   * onClick: 漢堡選單開關 + 轉場效果
   */
  const handleToggle = (e) => {
    e.preventDefault();

    function isMobileDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    if (isOpen === true) {
      // --------------------------------------------------------
      // Close 漢堡選單
      dispatch(setIsTransform(!isTransform));
      setTimeout(() => {
        dispatch(setIsOpen(!isOpen));
        document.body.style = {};
      }, 400);
    } else {
      // --------------------------------------------------------
      // Open 漢堡選單
      if (isMobileDevice()) {
        // 手機
        dispatch(setIsMobile(true));
        dispatch(setIsOpen(!isOpen));
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          dispatch(setIsTransform(!isTransform));
        }, 400);
      } else {
        // 電腦
        dispatch(setIsMobile(false));
        dispatch(setIsOpen(!isOpen));
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
        setTimeout(() => {
          dispatch(setIsTransform(!isTransform));
        }, 400);
      }
    }
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <header className={styles.header}>
        <div
          className={`${styles.box} ${cx(
            isOpen && !isMobile && styles.boxPadding
          )}`}
        >
          <div className={styles.hambuageBox}>
            <div className={styles.icon} onClick={handleToggle}>
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-primary" />
            </div>
            {isOpen && <Hambuage />}
          </div>

          <div className={styles.logoBox}>
            <div className={styles.logo}>
              <Link href={'/'}>
                <Logo />
              </Link>
            </div>
          </div>

          <nav className={styles.navbarBox}>
            <div className={styles.lang}>
              <Link locale={nextLocale} href={{ pathname, query }}>
                {router.locale === 'en'
                  ? t('header.chinese')
                  : t('header.english')}
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
