import styles from './dashboard-page.module.scss';

/* eslint-disable-next-line */
export interface DashboardPageProps {}

export function DashboardPage(props: DashboardPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to DashboardPage!</h1>
    </div>
  );
}

export default DashboardPage;
