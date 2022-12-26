import styles from './dashboard.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Dashboard!</h1>
      <h2>Welcome to Dashboard!</h2>
      <h3>Welcome to Dashboard!</h3>
      <h4>Welcome to Dashboard!</h4>
      <h5>Welcome to Dashboard!</h5>
      <h6>Welcome to Dashboard!</h6>
    </div>
  );
}

export default Dashboard;
