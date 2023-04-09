import Header from '/src/templates/widgets/header';
import styles from './index.module.scss';

export default function DefaultLayout({ children }) {
  return (
    <>
      <div id={styles.app}>
        <div className={styles.top}>
          <Header />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
