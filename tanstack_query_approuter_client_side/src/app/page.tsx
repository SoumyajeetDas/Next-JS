import AddUser from './addUser/page';
import styles from './page.module.css';
import ShowUser from './showUser/page';

export default function Home() {
  return (
    <div className={styles.page}>
      <ShowUser />
      <AddUser />
    </div>
  );
}
