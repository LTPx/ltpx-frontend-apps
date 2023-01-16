import styles from './teachers-page.module.scss';

/* eslint-disable-next-line */
export interface TeachersPageProps {}

export function TeachersPage(props: TeachersPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TeachersPage!</h1>
    </div>
  );
}

export default TeachersPage;
