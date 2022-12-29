import styles from './teacher-dashboard.module.scss';

/* eslint-disable-next-line */
export interface TeacherDashboardProps {}

export function TeacherDashboard(props: TeacherDashboardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TeacherDashboard!</h1>
    </div>
  );
}

export default TeacherDashboard;
