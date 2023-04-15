import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

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
  const router = useRouter();
  const { pathname, query } = router;
  const nextLocale = router.locale === 'en' ? 'zhHant' : 'en';

  /** ---------------------------------------------------------------------------------------------
   * State
   * @type {undefined|boolean}         isLogin             是否登入
   * @type {undefined|object}          object              是否登入
   * @type {boolean}                   toggle              漢堡清單開關狀態
   * @type {boolean}                   redirectPath        要進行轉址的路徑
   */
  const [isOpen, setIsOpen] = useState(false);
  const [isTransform, setIsTransform] = useState(false);
  const [isMobile, setIsMobile] = useState(undefined);

  /** ---------------------------------------------------------------------------------------------
   * onClick: 漢堡選單開關 + 轉場效果
   */
  const handleToggle = () => {
    function isMobileDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints;
    }

    if (isOpen === true) {
      // --------------------------------------------------------
      // Close 漢堡選單
      setIsTransform(!isTransform);
      setTimeout(() => {
        setIsOpen(!isOpen);
        document.body.style = {};
      }, 400);
    } else {
      // --------------------------------------------------------
      // Open 漢堡選單
      if (isMobileDevice()) {
        // 手機
        setIsMobile(true);
        setIsOpen(!isOpen);
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          setIsTransform(!isTransform);
        }, 400);
      } else {
        // 電腦
        setIsMobile(false);
        setIsOpen(!isOpen);
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
        setTimeout(() => {
          setIsTransform(!isTransform);
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

            {isOpen && (
              <Hambuage
                setIsOpen={setIsOpen}
                setIsTransform={setIsTransform}
                isTransform={isTransform}
              />
            )}
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
