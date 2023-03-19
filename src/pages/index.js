import styles from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-lime-700">
        Hello, Next.js!
      </h1>
      <p className={styles.status}>123</p>
    </>
  );
}
