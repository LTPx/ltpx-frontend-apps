import styles from './dashboard.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return (
    <div className={styles['container']}>
      <h2>I am a dashboard</h2>
    </div>
  );
}

export default Dashboard;
