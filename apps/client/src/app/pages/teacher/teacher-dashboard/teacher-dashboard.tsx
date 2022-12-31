import ApplyTeacherForm from '../apply-teacher-form/apply-teacher-form';
import styles from './teacher-dashboard.module.scss';

/* eslint-disable-next-line */
export interface TeacherDashboardProps {}

export function TeacherDashboard(props: TeacherDashboardProps) {
  return (
    <div className={styles['container']}>
      <ApplyTeacherForm/>
    </div>
  );
}

export default TeacherDashboard;
