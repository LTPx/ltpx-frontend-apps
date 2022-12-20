import styles from './new-course.module.scss';

/* eslint-disable-next-line */
export interface NewCourseProps {}

export function NewCourse(props: NewCourseProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NewCourse!</h1>
    </div>
  );
}

export default NewCourse;
