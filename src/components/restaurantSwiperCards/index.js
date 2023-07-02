import Link from 'next/link';
import moment from 'moment-timezone';

import { MapPinIcon, ClockIcon } from '@heroicons/react/24/solid';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './index.module.scss';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Restaurant Swiper Cards
 * @param  {array}     lists    cards 列表
 *
 * @return {html}
 */

function RestaurantSwiperCards({ lists }) {
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
              <SwiperSlide key={item.RestaurantID} className={styles.swiperSlide}>
                <Link
                  href={`/detail/restaurant/?did=${item.RestaurantID}`}
                  title={item.RestaurantName}
                  className={`${styles.perCard} shadow transition duration-150 ease-out hover:scale-95`}
                >
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: `url("${item.Picture.PictureUrl1}")`,
                    }}
                  ></div>

                  <div className={styles.content}>
                    <h3>{item.RestaurantName}</h3>
                    <div className={styles.intro}>
                      <MapPinIcon />
                      <p>{item.Address}</p>
                    </div>

                    <div className={styles.intro}>
                      <ClockIcon />
                      <p>
                        {item.OpenTime}
                      </p>
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

export default RestaurantSwiperCards;
