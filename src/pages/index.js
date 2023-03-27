import DefaultLayout from 'src/layout/defaultLayout';

import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <p className={styles.light_primary}>123</p>
      <p className={styles.light_light_primary}>123</p>
      <p className={styles.light_pale_primary}>123</p>
      <p className={styles.light_text_primary}>123</p>
      <p className={styles.light_text_second}>123</p>
      <p className={styles.light_text_tertiary}>123</p>
      <p className={styles.light_background_white}>123</p>
      <p className={styles.light_background_gray}>123</p>
      <p className={styles.light_line}>123</p>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};