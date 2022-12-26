import styles from './teacher-account.module.scss';

/* eslint-disable-next-line */
export interface TeacherAccountProps {}

export function TeacherAccount(props: TeacherAccountProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TeacherAccount!</h1>
    </div>
  );
}

export default TeacherAccount;
