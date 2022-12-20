import styles from './manage-courses.module.scss';

/* eslint-disable-next-line */
export interface ManageCoursesProps {}

export function ManageCourses(props: ManageCoursesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ManageCourses!</h1>
    </div>
  );
}

export default ManageCourses;
