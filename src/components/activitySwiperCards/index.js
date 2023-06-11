import Link from 'next/link';
import moment from 'moment-timezone';

import { MapPinIcon, ClockIcon } from '@heroicons/react/24/solid';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import styles from './index.module.scss';

/** ---------------------------------------------------------------------------------------------------------------------
 * Components: Activity Swiper Cards
 * @param  {array}     lists    cards 列表
 *
 * @return {html}
 */

function ActivitySwiperCards({ lists }) {
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
              <SwiperSlide key={item.ActivityID} className={styles.swiperSlide}>
                <Link
                  href={`/detail/activity/?did=${item.ActivityID}`}
                  title={item.ActivityName}
                  className={`${styles.perCard} shadow transition duration-150 ease-out hover:scale-95`}
                >
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: `url("${item.Picture.PictureUrl1}")`,
                    }}
                  ></div>

                  <div className={styles.content}>
                    <h3>{item.ActivityName}</h3>
                    <div className={styles.intro}>
                      <MapPinIcon />
                      <p>{item.City ?? item.Address.slice(0, 3)}</p>
                    </div>

                    <div className={styles.intro}>
                      <ClockIcon />
                      <p>
                        {moment(item.StartTime, moment.ISO_8601)
                          .tz('Asia/Taipei')
                          .format('YYYY-MM-DD') +
                          ' ~ ' +
                          moment(item.EndTime, moment.ISO_8601)
                            .tz('Asia/Taipei')
                            .format('YYYY-MM-DD')}
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

export default ActivitySwiperCards;
