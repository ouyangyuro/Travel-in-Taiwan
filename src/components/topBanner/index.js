import PropTypes from 'prop-types';
import Image from 'next/image';

import styles from './index.module.scss';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Banner
 * @param  {string}     title       標題
 * @param  {string}     subject     副標題
 * @param  {string}     imgSrc      banner image src
 *
 * @return {html}
 */
function TopBanner({ title, subject, imgSrc = '/images/banner.png' }) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.banner}>
        <h1 className="text-text_primary">
          <span>{title}</span>
          <span>{subject}</span>
        </h1>
        <div className={styles.imgBox}>
          <Image
            src={imgSrc}
            alt="banner"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </>
  );
}

export default TopBanner;

TopBanner.propTypes = {
  title: PropTypes.string,
  subject: PropTypes.string,
  imgSrc: PropTypes.string,
};
