import { useUser } from '@ltpx-frontend-apps/store';
import styles from './dashboard-page.module.scss';

/* eslint-disable-next-line */
export interface DashboardPageProps {}

export function DashboardPage(props: DashboardPageProps) {
  const { user } = useUser();
  return (
    <div className={styles['container']}>
      <h1>Welcome {user?.fullname}</h1>
    </div>
  );
}

export default DashboardPage;
