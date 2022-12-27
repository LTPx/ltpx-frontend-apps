import { Outlet } from 'react-router-dom';
import styles from './manage-courses.module.scss';
/* eslint-disable-next-line */
export interface ManageCoursesProps {}

export function ManageCourses(props: ManageCoursesProps) {
  return (
    <div className={styles['container']}>
      <h2>Cursos</h2>
      <h5>Administracion de cursos</h5>
      <div className={`${styles['content']} card`}>
        <Outlet/>
      </div>
    </div>
  );
}

export default ManageCourses;
