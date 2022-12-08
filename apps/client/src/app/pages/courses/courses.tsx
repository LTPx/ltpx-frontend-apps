import styles from './courses.module.scss';

/* eslint-disable-next-line */
export interface CoursesProps {}

export function Courses(props: CoursesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Courses!</h1>
    </div>
  );
}

export default Courses;
