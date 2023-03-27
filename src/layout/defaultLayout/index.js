import Link from 'next/link';
import styles from './index.module.scss';

export default function DefaultLayout({ children }) {
  return (
    <>
      <h1 className={styles.light_primary}>DefaultLayout</h1>
      <Link href="/test" locale="en">
        english
      </Link>
      <Link href="/test" locale="zhHant">
        中文
      </Link>
      <main>{children}</main>
    </>
  );
}
