import Link from 'next/link';

import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './index.module.scss';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Hotel Swiper Cards
 * @param  {array}     lists    cards 列表
 *
 * @return {html}
 */

function HotelSwiperCards({ lists }) {
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
                key={item.HotelID}
                className={styles.swiperSlide}
              >
                <Link
                  href={`/detail/hotel/?did=${item.HotelID}`}
                  title={item.HotelName}
                  className={`${styles.perCard} shadow transition duration-150 ease-out hover:scale-95`}
                >
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: `url("${item.Picture.PictureUrl1}")`,
                    }}
                  ></div>

                  <div className={styles.content}>
                    <h3>{item.HotelName}</h3>
                    <div className={styles.intro}>
                      <MapPinIcon />
                      <p>{item.Address}</p>
                    </div>

                    <div className={styles.intro}>
                      <PhoneIcon />
                      <p>{item.Phone}</p>
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

export default HotelSwiperCards;
