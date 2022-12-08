import styles from './dashboard.module.scss';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['sidebar']}>
        <div className="brand">LTPX</div>
        <div className="links">

        </div>
      </div>
      <div className={styles['content']}></div>
    </div>
  );
}

export default Dashboard;
