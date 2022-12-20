import styles from './manage-courses.module.scss';
/* eslint-disable-next-line */
export interface ManageCoursesProps {}

export function ManageCourses(props: ManageCoursesProps) {
  return (
    <div className={styles['container']}>
      <h2>Cursos</h2>
    </div>
  );
}

export default ManageCourses;
