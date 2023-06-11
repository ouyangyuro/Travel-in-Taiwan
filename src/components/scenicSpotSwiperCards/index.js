import Link from 'next/link';

import { MapPinIcon, ClockIcon } from '@heroicons/react/24/solid';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './index.module.scss';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Scenic Spot Swiper Cards
 * @param  {array}     lists    cards 列表
 *
 * @return {html}
 */

function ScenicSpotSwiperCards({ lists }) {
  // ---------------------------------------------------------------------------------------------

  return (
    <>
      <div className={styles.swiperBox}>
        <Swiper
          spaceBetween={20}
          slidesPerView={'auto'}
          className={styles.swiper}
        >
          {lists &&
            lists.map((item) => (
              <SwiperSlide
                key={item.ScenicSpotID}
                className={styles.swiperSlide}
              >
                <Link
                  href={`/detail/scenicSpot/?did=${item.ScenicSpotID}`}
                  title={item.ScenicSpotName}
                  className={`${styles.perCard} shadow transition duration-150 ease-out hover:scale-95`}
                >
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: `url("${item.Picture.PictureUrl1}")`,
                    }}
                  ></div>

                  <div className={styles.content}>
                    <h3>{item.ScenicSpotName}</h3>
                    <div className={styles.intro}>
                      <MapPinIcon />
                      <p>{item.City ?? item.Address.slice(0, 3)}</p>
                    </div>

                    <div className={styles.intro}>
                      <ClockIcon />
                      <p>{item.OpenTime}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

export default ScenicSpotSwiperCards;
