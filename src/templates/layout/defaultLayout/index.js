import Header from '/src/templates/widgets/header';
import LeftMenu from '/src/templates/widgets/leftMenu';
import styles from './index.module.scss';

export default function DefaultLayout({ children }) {
  return (
    <>
      <div id={styles.app}>
        <div className={styles.container}>
          <Header />
          <div className={styles.box}>
            <div className={styles.left}>
              <LeftMenu />
            </div>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
