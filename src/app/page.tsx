import styles from "./page.module.css";
import dynamic from 'next/dynamic'

const SDK = dynamic(() => import('./sdk'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

export default function Home() {
  return (
    <main className={styles.main}>
      <SDK />
    </main>
  );
}
