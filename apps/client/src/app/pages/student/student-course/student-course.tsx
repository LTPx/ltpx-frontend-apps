import styles from './student-course.module.scss';

/* eslint-disable-next-line */
export interface StudentCourseProps {}

export function StudentCourse(props: StudentCourseProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to StudentCourse!</h1>
    </div>
  );
}

export default StudentCourse;
