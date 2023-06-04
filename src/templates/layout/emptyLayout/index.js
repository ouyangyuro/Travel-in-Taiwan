import Header from 'src/templates/widgets/header';
import Footer from 'src/templates/widgets/footer';
import styles from './index.module.scss';

export default function EmptyLayout({ children }) {
  return (
    <>
      <div id={styles.app}>
        <div className={styles.container}>
          <Header />
          <main>
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
