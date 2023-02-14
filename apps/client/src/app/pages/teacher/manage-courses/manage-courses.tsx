import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './manage-courses.module.scss';
/* eslint-disable-next-line */
export interface ManageCoursesProps {}

export function ManageCourses(props: ManageCoursesProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const paths = location.pathname.split('/');
      const routes =paths.map((path)=>{
        return {
          url: location.pathname,
          name: path
        }
      })
      setBreadcrumbs(routes);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles['container']}>
      {/* <h2>Cursos</h2> */}
      {/* <div className={styles['breadcrumbs']}>
        { breadcrumbs.map((breadcrumb, index)=>(
          <div className={styles['breadcrumb']} key={index}>
            <NavLink to={`${breadcrumb.url}`}>
              {breadcrumb.name}
            </NavLink>
            <p>/</p>
          </div>
        ))}
      </div> */}
      <div className={`${styles['content']}`}>
        <Outlet/>
      </div>
    </div>
  );
}

export default ManageCourses;
