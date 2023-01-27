import styles from './teacher-earnings.module.scss';

/* eslint-disable-next-line */
export interface TeacherEarningsProps {}

export function TeacherEarnings(props: TeacherEarningsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TeacherEarnings!</h1>
    </div>
  );
}

export default TeacherEarnings;
