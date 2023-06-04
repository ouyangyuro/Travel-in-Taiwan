import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import copy from '@utils/copy';
import { WEB_HOSTNAME_URL } from 'src/config/config';

import Alert from '@components/alert';

import { ChevronLeftIcon, ShareIcon } from '@heroicons/react/24/solid';

/** ---------------------------------------------------------------------------------------------------------------------
 * @param  {string}    spotName     觀光資訊的標題
 *
 * @return {html}
 */
function BackBtnWithTitleAndCopy({ spotName }) {
  /** ---------------------------------------------------------------------------------------------
   * Basic
   */
  const router = useRouter();
  const { t } = useTranslation('common');

  /** ---------------------------------------------------------------------------------------------
   * State
   * @type {object}   alert   彈跳視窗
   */
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  /** ---------------------------------------------------------------------------------------------
   * onClick: Copy Link按鈕
   */
  const handleCopyLink = (e) => {
    e.preventDefault();

    const copyStatus = copy({
      text:
        WEB_HOSTNAME_URL === 'localhost:3000'
          ? `http://${WEB_HOSTNAME_URL}${router.asPath}`
          : `https://${WEB_HOSTNAME_URL}${router.asPath}`,
    });

    copyStatus
      ? setAlert({
          open: true,
          severity: 'success',
          message: t('copy_link.success'),
        })
      : setAlert({
          open: true,
          severity: 'error',
          message: t('copy_link.error'),
        });
  };

  /** ---------------------------------------------------------------------------------------------
   * onClose: Alert close
   */
  const handleAlertClose = (e) => {
    e.preventDefault();

    setAlert({ ...alert, open: false });
  };

  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleAlertClose}
      />

      <div className="w-full">
        <div className="flex justify-between items-center">
          {/* back btn and spot name */}
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 mr-2 rounded-full flex justify-center items-center"
            >
              <ChevronLeftIcon
                className="w-5 h-5 text-text_primary"
                aria-hidden="true"
              />
            </button>

            <h1 className="font-bold text-2xl text-text_primary">{spotName}</h1>
          </div>

          {/* share link copy */}
          <button
            onClick={handleCopyLink}
            className="w-10 h-10 flex justify-center items-center"
          >
            <ShareIcon className="w-5 h-5 text-primary" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}

export default BackBtnWithTitleAndCopy;
